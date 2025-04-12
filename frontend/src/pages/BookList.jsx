import React, { useState, useEffect } from 'react';
import { bookApi } from '../utils/api';
import BookCard from '../components/BookCard';

function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    title: '',
    genre: '',
    location: ''
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await bookApi.getAllBooks();
      setBooks(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching books:', error);
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleFilterSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await bookApi.filterBooks(filters);
      setBooks(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error filtering books:', error);
      setLoading(false);
    }
  };

  const clearFilters = () => {
    setFilters({
      title: '',
      genre: '',
      location: ''
    });
    fetchBooks();
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Browse Books</h1>
        <p className="text-gray-600">
          Discover books shared by our community members
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Filter Books</h2>
        <form onSubmit={handleFilterSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label htmlFor="title" className="block text-gray-700 font-medium mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={filters.title}
                onChange={handleFilterChange}
                className="form-input"
                placeholder="Search by title"
              />
            </div>
            <div>
              <label htmlFor="genre" className="block text-gray-700 font-medium mb-1">
                Genre
              </label>
              <select
                id="genre"
                name="genre"
                value={filters.genre}
                onChange={handleFilterChange}
                className="form-input"
              >
                <option value="">All Genres</option>
                <option value="Fiction">Fiction</option>
                <option value="Non-fiction">Non-fiction</option>
                <option value="Science Fiction">Science Fiction</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Mystery">Mystery</option>
                <option value="Thriller">Thriller</option>
                <option value="Romance">Romance</option>
                <option value="Biography">Biography</option>
                <option value="History">History</option>
                <option value="Self-help">Self-help</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="location" className="block text-gray-700 font-medium mb-1">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                className="form-input"
                placeholder="Search by location"
              />
            </div>
          </div>
          <div className="flex space-x-2">
            <button type="submit" className="btn-primary">
              Apply Filters
            </button>
            <button
              type="button"
              onClick={clearFilters}
              className="btn-secondary"
            >
              Clear Filters
            </button>
          </div>
        </form>
      </div>

      {/* Book List */}
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="w-12 h-12 border-4 border-primary-500 rounded-full border-t-transparent animate-spin"></div>
        </div>
      ) : books.length === 0 ? (
        <div className="bg-white shadow-md rounded-lg p-12 text-center">
          <h3 className="text-2xl font-medium text-gray-700 mb-2">No books found</h3>
          <p className="text-gray-500 mb-4">Try adjusting your filters or check back later for new listings.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
}

export default BookList; 