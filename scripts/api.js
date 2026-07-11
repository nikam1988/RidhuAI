const API_URL = 'http://localhost:5000/api';

const fetchAPI = async (endpoint, method = 'GET', body = null) => {
  const token = localStorage.getItem('token');
  const headers = {};
  
  if (!(body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    method,
    headers,
  };

  if (body) {
    config.body = body instanceof FormData ? body : JSON.stringify(body);
  }

  const res = await fetch(`${API_URL}${endpoint}`, config);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
};

// Expose API globally
window.api = {
  login: (email, password) => fetchAPI('/auth/login', 'POST', { email, password }),
  register: (name, email, password) => fetchAPI('/auth/register', 'POST', { name, email, password }),
  getWorksheets: (queryParams = '') => fetchAPI(`/worksheets${queryParams}`),
  getWorksheetById: (id) => fetchAPI(`/worksheets/${id}`),
  createOrder: (orderItems, totalPrice) => fetchAPI('/orders', 'POST', { orderItems, totalPrice }),
  
  // Admin only
  createWorksheet: (formData) => fetchAPI('/worksheets', 'POST', formData),
  deleteWorksheet: (id) => fetchAPI(`/worksheets/${id}`, 'DELETE')
};
