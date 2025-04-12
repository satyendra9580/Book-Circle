import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { bookApi } from '../utils/api';
import { useAuth } from '../context/AuthContext';

function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    location: '',
    coverImage: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBook();
  }, [id]);

  const fetchBook = async () => {
    try {
      setLoading(true);
      const response = await bookApi.getBookById(id);
      const book = response.data;

      // Ensure only the owner can edit the book
      if (book.owner._id !== currentUser._id) {
        setError('You are not authorized to edit this book.');
        setLoading(false);
        return;
      }

      setFormData({
        title: book.title,
        author: book.author,
        genre: book.genre,
        location: book.location,
        coverImage: book.coverImage,
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching book:', error);
      setError('Book not found or an error occurred.');
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await bookApi.updateBook(id, formData);
      navigate(`/books/${id}`);
    } catch (error) {
      console.error('Error updating book:', error);
      setError('Failed to update the book. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-12 h-12 border-4 border-primary-500 rounded-full border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white shadow-md rounded-lg p-12 text-center">
        <h3 className="text-2xl font-medium text-gray-700 mb-2">{error}</h3>
        <p className="text-gray-500 mb-4">You cannot edit this book.</p>
        <button onClick={() => navigate('/books')} className="btn-primary">
          Back to Books
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Edit Book</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-medium mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="author" className="block text-gray-700 font-medium mb-1">
            Author
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="genre" className="block text-gray-700 font-medium mb-1">
            Genre
          </label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="location" className="block text-gray-700 font-medium mb-1">
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="coverImage" className="block text-gray-700 font-medium mb-1">
            Cover Image URL
          </label>
          <input
            type="text"
            id="coverImage"
            name="coverImage"
            value={formData.coverImage}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="flex space-x-2">
          <button type="submit" className="btn-primary">
            Save Changes
          </button>
          <button type="button" onClick={() => navigate(`/books/${id}`)} className="btn-secondary">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditBook;