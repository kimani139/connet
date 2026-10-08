// Supabase Client Initialization
const SUPABASE_URL = window.FUNDI_CONFIG.supabaseUrl;
const SUPABASE_KEY = window.FUNDI_CONFIG.supabaseAnonKey;

// Simple Supabase Client Implementation
class SupabaseClient {
  constructor(url, key) {
    this.url = url;
    this.key = key;
    this.headers = {
      'Content-Type': 'application/json',
      'apikey': key,
      'Authorization': `Bearer ${key}`
    };
  }

  async request(method, endpoint, data = null) {
    const url = `${this.url}/rest/v1${endpoint}`;
    const options = {
      method,
      headers: this.headers
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`Supabase error: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Supabase request failed:', error);
      throw error;
    }
  }

  // Categories
  async getCategories() {
    return this.request('GET', '/categories');
  }

  // Professionals
  async getProfessionals(filters = {}) {
    let query = '/professionals?select=*';
    if (filters.category) query += `&category=eq.${filters.category}`;
    if (filters.location) query += `&location=ilike.%${filters.location}%`;
    return this.request('GET', query);
  }

  async getProfessionalById(id) {
    return this.request('GET', `/professionals?id=eq.${id}`);
  }

  // Bookings
  async createBooking(bookingData) {
    return this.request('POST', '/bookings', bookingData);
  }

  async getBookings(customerId) {
    return this.request('GET', `/bookings?customer_id=eq.${customerId}`);
  }

  // Auth
  async signUp(email, password, userData) {
    const authUrl = `${this.url}/auth/v1/signup`;
    const response = await fetch(authUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': this.key
      },
      body: JSON.stringify({ email, password })
    });
    return response.json();
  }

  async signIn(email, password) {
    const authUrl = `${this.url}/auth/v1/token?grant_type=password`;
    const response = await fetch(authUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': this.key
      },
      body: JSON.stringify({ email, password })
    });
    return response.json();
  }
}

const supabase = new SupabaseClient(SUPABASE_URL, SUPABASE_KEY);
