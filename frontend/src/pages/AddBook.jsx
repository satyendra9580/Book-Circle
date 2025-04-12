import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { bookApi } from '../utils/api';

function AddBook() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    location: '',
    coverImage: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { title, author, genre, location, coverImage } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!title || !author || !genre || !location) {
      setError('Please fill in all required fields');
      return;
    }
    
    try {
      setLoading(true);
      const response = await bookApi.addBook(formData);
      navigate(`/books/${response.data._id}`);
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to add book. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Add a New Book</h1>
        <p className="text-gray-600">
          Share your book with the community
        </p>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        {error && (
          <div className="bg-red-50 text-red-800 p-3 rounded-md mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-medium mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter book title"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="author" className="block text-gray-700 font-medium mb-1">
              Author <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={author}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter author name"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="genre" className="block text-gray-700 font-medium mb-1">
              Genre <span className="text-red-500">*</span>
            </label>
            <select
              id="genre"
              name="genre"
              value={genre}
              onChange={handleChange}
              className="form-input"
              required
            >
              <option value="">Select a genre</option>
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
          
          <div className="mb-4">
            <label htmlFor="location" className="block text-gray-700 font-medium mb-1">
              Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={location}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter your city/location"
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="coverImage" className="block text-gray-700 font-medium mb-1">
              Cover Image URL (optional)
            </label>
            <input
              type="url"
              id="coverImage"
              name="coverImage"
              value={coverImage}
              onChange={handleChange}
              className="form-input"
              placeholder="Enter URL for book cover image"
            />
            <p className="text-sm text-gray-500 mt-1">
              Leave blank to use a default cover
            </p>
          </div>
          
          <div className="flex space-x-2">
            <button
              type="submit"
              className="btn-primary py-3 px-8"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin mr-2"></div>
                  Adding...
                </div>
              ) : (
                'Add Book'
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate('/books')}
              className="btn-secondary py-3 px-8"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddBook; 