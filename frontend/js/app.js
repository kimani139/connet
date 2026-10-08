// Supabase Client Initialization
const SUPABASE_URL = window.FUNDI_CONFIG.supabaseUrl;
const SUPABASE_KEY = window.FUNDI_CONFIG.supabaseAnonKey;

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
    const options = { method, headers: this.headers };
    if (data) options.body = JSON.stringify(data);

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Supabase request failed (${response.status}): ${text}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Supabase request failed:', error);
      throw error;
    }
  }

  async getCategories() {
    return this.request('GET', '/categories?select=*');
  }

  async getProfessionals(filters = {}) {
    let query = '/professionals?select=*';
    const params = [];

    if (filters.category) params.push(`category=eq.${encodeURIComponent(filters.category)}`);
    if (filters.location) params.push(`location=ilike.*${encodeURIComponent(filters.location)}*`);
    if (params.length) query += '&' + params.join('&');

    return this.request('GET', query);
  }

  async getProfessionalById(id) {
    return this.request('GET', `/professionals?id=eq.${id}&select=*`);
  }

  async createBooking(bookingData) {
    return this.request('POST', '/bookings', bookingData);
  }

  async signUp(email, password, userData = {}) {
    const authUrl = `${this.url}/auth/v1/signup`;
    const response = await fetch(authUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': this.key
      },
      body: JSON.stringify({ email, password, data: userData })
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || 'Signup failed');
    }

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

    if (!response.ok) {
      const text = await response.text();
      throw new Error(text || 'Login failed');
    }

    return response.json();
  }
}

const supabase = new SupabaseClient(SUPABASE_URL, SUPABASE_KEY);
