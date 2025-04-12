import axios from 'axios';

const URI=process.env.REACT_APP_URL;
const API_URL = `${URI}/api`;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth-token'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const bookApi = {
  getAllBooks: () => api.get('/books'),
  getBookById: (id) => api.get(`/books/${id}`),
  addBook: (bookData) => api.post('/books', bookData),
  updateBook: (id, bookData) => api.put(`/books/${id}`, bookData),
  deleteBook: (id) => api.delete(`/books/${id}`),
  getMyBooks: () => api.get('/books/my'),
  filterBooks: (params) => api.get('/books/filter', { params })
};

export const userApi = {
  getOwners: () => api.get('/users/owners'),
  getSeekers: () => api.get('/users/seekers'),
  getUserById: (id) => api.get(`/users/${id}`)
};

export default api; 