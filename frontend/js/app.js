// FundiConnect Kenya - Main Application

// Global State
const appState = {
  currentUser: null,
  professionals: [],
  categories: [],
  filteredProfessionals: [],
  bookings: [],
  isLoggedIn: false
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
});

async function initializeApp() {
  console.log('🚀 FundiConnect Kenya initializing...');
  
  // Load categories and professionals
  await loadCategories();
  await loadProfessionals();
  
  // Setup event listeners
  setupEventListeners();
  setupNavigation();
  setupForms();
  setupFilters();
  
  console.log('✅ FundiConnect Kenya ready');
}

// ===== LOAD DATA =====
async function loadCategories() {
  try {
    const categories = await supabase.getCategories();
    appState.categories = categories;
    renderCategories(categories);
    populateCategoryFilter(categories);
  } catch (error) {
    console.error('Failed to load categories:', error);
    // Use fallback demo categories
    loadDemoCategories();
  }
}

async function loadProfessionals() {
  try {
    const professionals = await supabase.getProfessionals();
    appState.professionals = professionals;
    appState.filteredProfessionals = professionals;
    renderProfessionals(professionals);
  } catch (error) {
    console.error('Failed to load professionals:', error);
    // Use fallback demo professionals
    loadDemoProfessionals();
  }
}

function loadDemoCategories() {
  const demoCategories = [
    { id: 1, name: 'Carpentry', description: 'Custom joinery, cabinetry, framing, and finishes.', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=900&q=80' },
    { id: 2, name: 'Plumbing', description: 'Pipe repairs, installations, and leak fixes.', image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80' },
    { id: 3, name: 'Electrical Services', description: 'Wiring, repair, maintenance, and safety checks.', image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=900&q=80' },
    { id: 4, name: 'Painting', description: 'Interior and exterior painting with neat finishes.', image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=900&q=80' },
    { id: 5, name: 'Welding', description: 'Steelwork, fabrication, and structural repairs.', image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=900&q=80' },
    { id: 6, name: 'Cleaning', description: 'Home, office, and deep cleaning services.', image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80' },
    { id: 7, name: 'Mechanics', description: 'Vehicle maintenance, diagnostics, and body repairs.', image: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=900&q=80' },
    { id: 8, name: 'Computer and Phone Repair', description: 'Device diagnostics, repairs, and upgrades.', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80' },
  ];
  appState.categories = demoCategories;
  renderCategories(demoCategories);
  populateCategoryFilter(demoCategories);
}

function loadDemoProfessionals() {
  const demoProfessionals = [
    { id: 1, name: 'Amina Wanjiku', trade: 'Carpenter', location: 'Nairobi West', bio: 'Custom furniture maker with 8+ years experience.', profile_image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80', cover_image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80', price_range: 'KSh 1,800 - 5,000', rating: 4.9, reviews_count: 42, experience: 8, verified: true, available: true, category_id: 1, skills: ['Cabinet installation', 'Custom shelving', 'Wardrobes'] },
    { id: 2, name: 'Daniel Otieno', trade: 'Electrician', location: 'Kisumu', bio: 'Licensed electrician with safe and efficient work.', profile_image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80', cover_image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=1200&q=80', price_range: 'KSh 2,000 - 6,500', rating: 4.8, reviews_count: 31, experience: 6, verified: true, available: true, category_id: 3, skills: ['Wiring', 'Lighting design', 'Fault finding'] },
    { id: 3, name: 'Jane Njeri', trade: 'Plumber', location: 'Nakuru', bio: 'Reliable plumbing expert with leak detection expertise.', profile_image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80', cover_image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80', price_range: 'KSh 1,500 - 4,800', rating: 4.7, reviews_count: 25, experience: 5, verified: true, available: true, category_id: 2, skills: ['Pipe fitting', 'Bathroom installations', 'Leak repair'] },
    { id: 4, name: 'Joseph Kariuki', trade: 'Painter', location: 'Thika', bio: 'Interior and exterior painter with smooth finishes.', profile_image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80', cover_image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1200&q=80', price_range: 'KSh 1,200 - 5,200', rating: 4.6, reviews_count: 22, experience: 7, verified: false, available: true, category_id: 4, skills: ['Wall priming', 'Decorative finishes', 'Exterior painting'] },
    { id: 5, name: 'Peter Kamau', trade: 'Welder', location: 'Mombasa', bio: 'Fabrication and repair specialist for metal structures.', profile_image: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=900&q=80', cover_image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80', price_range: 'KSh 2,500 - 7,500', rating: 4.9, reviews_count: 18, experience: 9, verified: true, available: false, category_id: 5, skills: ['Metal fabrication', 'Gate repairs', 'Steel welding'] },
    { id: 6, name: 'Grace Mburu', trade: 'Cleaner', location: 'Westlands', bio: 'Home and office cleaning professional.', profile_image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80', cover_image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80', price_range: 'KSh 1,000 - 3,200', rating: 4.8, reviews_count: 29, experience: 4, verified: true, available: true, category_id: 6, skills: ['Deep cleaning', 'Move-in cleaning', 'Office tidying'] },
    { id: 7, name: 'Kevin Omondi', trade: 'Mechanic', location: 'Nairobi CBD', bio: 'Vehicle diagnostics and maintenance specialist.', profile_image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80', cover_image: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=1200&q=80', price_range: 'KSh 2,200 - 6,800', rating: 4.7, reviews_count: 36, experience: 10, verified: true, available: true, category_id: 7, skills: ['Engine tuning', 'Brake service', 'Diagnostics'] },
    { id: 8, name: 'Salim Ali', trade: 'Phone & Computer Repair', location: 'Eldoret', bio: 'Tech repair specialist for devices and troubleshooting.', profile_image: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=900&q=80', cover_image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80', price_range: 'KSh 1,800 - 5,000', rating: 4.9, reviews_count: 40, experience: 6, verified: true, available: true, category_id: 8, skills: ['Smartphone repair', 'Laptop diagnostics', 'Software setup'] },
  ];
  appState.professionals = demoProfessionals;
  appState.filteredProfessionals = demoProfessionals;
  renderProfessionals(demoProfessionals);
}

// ===== RENDER FUNCTIONS =====
function renderCategories(categories) {
  const grid = document.getElementById('services-grid');
  if (!grid) return;
  
  grid.innerHTML = categories.map(cat => `
    <div class="service-card">
      <div class="service-media" style="background-image: url('${cat.image}')"></div>
      <div class="service-caption">
        <h3>${cat.name}</h3>
        <p>${cat.description || ''}</p>
        <a href="#find-fundi" class="explore-link">Explore Fundis</a>
      </div>
    </div>
  `).join('');
}

function renderProfessionals(professionals) {
  const grid = document.getElementById('professionals-grid');
  if (!grid) return;
  
  if (professionals.length === 0) {
    grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #666;">No professionals found matching your criteria.</p>';
    return;
  }
  
  grid.innerHTML = professionals.map(prof => `
    <div class="professional-card">
      <div class="professional-cover" style="background-image: url('${prof.cover_image}')"></div>
      <div class="professional-body">
        <div class="professional-head">
          <img src="${prof.profile_image}" alt="${prof.name}" class="professional-avatar">
          <div>
            <h3 style="margin: 0;">${prof.name}</h3>
            <p style="margin: 0; color: #666; font-size: 0.9rem;">${prof.trade}</p>
          </div>
        </div>
        <div class="professional-meta">
          <span>📍 ${prof.location}</span>
          ${prof.verified ? '<span class="badge verified">✓ Verified</span>' : '<span class="badge unverified">Pending</span>'}
        </div>
        <div class="professional-meta">
          <span>⭐ ${prof.rating || 4.5} (${prof.reviews_count || 0} reviews)</span>
          <span>📅 ${prof.experience || 0} years</span>
        </div>
        <p>${prof.bio || ''}</p>
        <div class="skill-list">
          ${(prof.skills || []).map(skill => `<span>${skill}</span>`).join('')}
        </div>
        <p><strong>${prof.price_range || 'Quote on request'}</strong></p>
        <div class="professional-actions">
          <button class="btn btn-primary" onclick="openBookingModal('${prof.name}', '${prof.trade}')">Book Now</button>
          <button class="btn btn-ghost">Save</button>
        </div>
      </div>
    </div>
  `).join('');
}

function populateCategoryFilter(categories) {
  const select = document.getElementById('filter-category');
  if (!select) return;
  
  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat.name;
    option.textContent = cat.name;
    select.appendChild(option);
  });
}

// ===== SETUP EVENT LISTENERS =====
function setupEventListeners() {
  // Navigation toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navPanel = document.querySelector('.nav-panel');
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navPanel.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', navPanel.classList.contains('is-open'));
    });
  }

  // Modal close
  const modal = document.getElementById('booking-modal');
  const backdrop = document.querySelector('.modal-backdrop');
  const closeBtn = document.querySelector('.modal-close');
  if (backdrop) backdrop.addEventListener('click', () => modal.classList.remove('is-open'));
  if (closeBtn) closeBtn.addEventListener('click', () => modal.classList.remove('is-open'));
}

function setupNavigation() {
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      document.querySelector('.nav-panel').classList.remove('is-open');
    });
  });
}

function setupForms() {
  // Booking form
  const bookingForm = document.getElementById('booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      await handleBookingSubmit(e.target);
    });
  }

  // Login form
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      await handleLogin(e.target);
    });
  }

  // Register form
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      await handleRegister(e.target);
    });
  }
}

function setupFilters() {
  const searchInput = document.getElementById('directory-search');
  const categoryFilter = document.getElementById('filter-category');
  const locationFilter = document.getElementById('filter-location');
  const priceFilter = document.getElementById('filter-price');
  const experienceFilter = document.getElementById('filter-experience');

  const applyFilters = () => {
    let filtered = appState.professionals;

    if (searchInput?.value) {
      const search = searchInput.value.toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(search) ||
        p.trade.toLowerCase().includes(search) ||
        p.location.toLowerCase().includes(search)
      );
    }

    if (categoryFilter?.value) {
      filtered = filtered.filter(p => p.trade === categoryFilter.value);
    }

    if (locationFilter?.value) {
      filtered = filtered.filter(p => p.location.toLowerCase().includes(locationFilter.value.toLowerCase()));
    }

    if (experienceFilter?.value) {
      const minExp = parseInt(experienceFilter.value.split('+')[0]);
      filtered = filtered.filter(p => (p.experience || 0) >= minExp);
    }

    appState.filteredProfessionals = filtered;
    renderProfessionals(filtered);
  };

  searchInput?.addEventListener('input', applyFilters);
  categoryFilter?.addEventListener('change', applyFilters);
  locationFilter?.addEventListener('change', applyFilters);
  priceFilter?.addEventListener('change', applyFilters);
  experienceFilter?.addEventListener('change', applyFilters);
}

// ===== FORM HANDLERS =====
async function handleBookingSubmit(form) {
  const formData = new FormData(form);
  const bookingData = Object.fromEntries(formData);
  const statusEl = form.querySelector('.form-status');

  try {
    await supabase.createBooking(bookingData);
    statusEl.textContent = '✅ Booking request submitted successfully!';
    statusEl.classList.add('success');
    form.reset();
    setTimeout(() => {
      document.getElementById('booking-modal').classList.remove('is-open');
      statusEl.textContent = '';
    }, 2000);
  } catch (error) {
    statusEl.textContent = '❌ Booking failed. Please try again.';
    statusEl.classList.add('error');
  }
}

async function handleLogin(form) {
  const formData = new FormData(form);
  const { email, password } = Object.fromEntries(formData);

  try {
    const response = await supabase.signIn(email, password);
    if (response.access_token) {
      localStorage.setItem('fundiToken', response.access_token);
      appState.isLoggedIn = true;
      appState.currentUser = { email };
      alert('✅ Login successful!');
      form.reset();
    } else {
      alert('❌ Login failed. Check your credentials.');
    }
  } catch (error) {
    alert('❌ Login error: ' + error.message);
  }
}

async function handleRegister(form) {
  const formData = new FormData(form);
  const { name, email, password, role } = Object.fromEntries(formData);

  try {
    const response = await supabase.signUp(email, password, { name, role });
    if (response.id || response.access_token) {
      alert('✅ Account created! Please check your email to confirm.');
      form.reset();
    } else {
      alert('❌ Registration failed.');
    }
  } catch (error) {
    alert('❌ Registration error: ' + error.message);
  }
}

// ===== UTILITIES =====
function openBookingModal(professionalName, trade) {
  const modal = document.getElementById('booking-modal');
  const form = document.getElementById('booking-form');
  const serviceInput = form.querySelector('input[name="service"]');
  serviceInput.value = `${trade} - ${professionalName}`;
  modal.classList.add('is-open');
}
