const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const path = require('path');
const { initDatabase, getDb, getCategories, getProfessionals, getProfessionalById, createBooking, createUser, findUserByEmail, getUserById, getStats, getBookingsForAdmin } = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

const staticDir = path.join(__dirname, '..', 'frontend');
app.use(express.static(staticDir));

const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token) {
    return res.status(401).json({ message: 'Authentication required.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'development_secret');
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required.' });
  }
  next();
};

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'FundiConnect Kenya API is running.' });
});

app.get('/api/categories', async (req, res) => {
  try {
    const categories = await getCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load categories.', error: error.message });
  }
});

app.get('/api/professionals', async (req, res) => {
  try {
    const { category, location, minPrice, maxPrice, experience, search } = req.query;
    const professionals = await getProfessionals({
      category,
      location,
      minPrice,
      maxPrice,
      experience,
      search,
    });
    res.json(professionals);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load professionals.', error: error.message });
  }
});

app.get('/api/professionals/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (!id) {
    return res.status(400).json({ message: 'Invalid professional id.' });
  }

  try {
    const professional = await getProfessionalById(id);
    if (!professional) {
      return res.status(404).json({ message: 'Professional not found.' });
    }
    res.json(professional);
  } catch (error) {
    res.status(500).json({ message: 'Failed to load professional details.', error: error.message });
  }
});

app.post('/api/auth/register', async (req, res) => {
  const { name, email, password, role = 'customer', phone = '', location = '' } = req.body || {};

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required.' });
  }

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: 'A user with that email already exists.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await createUser({
      name,
      email,
      password_hash: passwordHash,
      role,
      phone,
      location,
    });

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role, name: user.name }, process.env.JWT_SECRET || 'development_secret', { expiresIn: '7d' });
    res.status(201).json({ message: 'Registration successful.', token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed.', error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role, name: user.name }, process.env.JWT_SECRET || 'development_secret', { expiresIn: '7d' });
    res.json({ message: 'Login successful.', token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: 'Login failed.', error: error.message });
  }
});

app.get('/api/auth/me', requireAuth, async (req, res) => {
  try {
    const user = await getUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role, phone: user.phone, location: user.location } });
  } catch (error) {
    res.status(500).json({ message: 'Could not fetch user.', error: error.message });
  }
});

app.post('/api/bookings', async (req, res) => {
  const {
    customerName,
    phone,
    email,
    service,
    location,
    description,
    preferredDate,
    preferredTime,
  } = req.body || {};

  if (!customerName || !email || !service || !location || !description) {
    return res.status(400).json({ message: 'Please complete all required booking fields.' });
  }

  try {
    const booking = await createBooking({
      customer_name: customerName,
      phone: phone || '',
      email,
      service,
      location,
      description,
      preferred_date: preferredDate || '',
      preferred_time: preferredTime || '',
      status: 'pending',
    });

    res.status(201).json({
      message: 'Booking request received successfully. We will contact you soon.',
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: 'Booking request failed.', error: error.message });
  }
});

app.get('/api/admin/dashboard', requireAuth, requireAdmin, async (req, res) => {
  try {
    const stats = await getStats();
    const bookings = await getBookingsForAdmin();
    res.json({ stats, bookings });
  } catch (error) {
    res.status(500).json({ message: 'Could not load admin dashboard.', error: error.message });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(staticDir, 'index.html'));
});

async function startServer() {
  await initDatabase();
  app.listen(PORT, () => {
    console.log(`FundiConnect Kenya API running on http://localhost:${PORT}`);
  });
}

startServer();
