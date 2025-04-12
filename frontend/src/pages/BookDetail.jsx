import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { bookApi } from '../utils/api';
import { useAuth } from '../context/AuthContext';

function BookDetail() {
  const { id } = useParams();
  const { currentUser, isOwner } = useAuth();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusUpdating, setStatusUpdating] = useState(false);

  useEffect(() => {
    fetchBook();
  }, [id]);

  const fetchBook = async () => {
    try {
      setLoading(true);
      const response = await bookApi.getBookById(id);
      setBook(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching book:', error);
      setError('Book not found or an error occurred');
      setLoading(false);
    }
  };

  const handleStatusChange = async (status) => {
    try {
      setStatusUpdating(true);
      await bookApi.updateBook(id, { status });
      await fetchBook();
      setStatusUpdating(false);
    } catch (error) {
      console.error('Error updating book status:', error);
      setStatusUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await bookApi.deleteBook(id);
        navigate('/books');
      } catch (error) {
        console.error('Error deleting book:', error);
      }
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
        <p className="text-gray-500 mb-4">The book you're looking for might have been removed or doesn't exist.</p>
        <Link to="/books" className="btn-primary">
          Browse Books
        </Link>
      </div>
    );
  }

  const isBookOwner = currentUser && book.owner._id === currentUser._id;

  return (
    <div>
      <div className="mb-6">
        <Link to="/books" className="text-primary-600 hover:underline flex items-center">
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Books
        </Link>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3">
            <div className="relative pb-[140%]">
              <img
                src={book.coverImage || 'https://via.placeholder.com/400x600?text=No+Cover'}
                alt={book.title}
                className="absolute h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="md:w-2/3 p-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{book.title}</h1>
                <p className="text-lg text-gray-600 mb-4">by {book.author}</p>
              </div>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  book.status === 'available'
                    ? 'bg-green-100 text-green-800'
                    : book.status === 'rented'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {book.status === 'available' ? 'Available' : book.status === 'rented' ? 'Rented' : 'Exchanged'}
              </span>
            </div>

            <div className="mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-center mb-2">
                <svg className="w-5 h-5 text-primary-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                <span className="text-gray-700">{book.genre}</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-primary-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-700">{book.location}</span>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Owner Information</h2>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm mr-3">
                  {book.owner.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{book.owner.name}</p>
                  <p className="text-gray-600 text-sm">{book.owner.email}</p>
                </div>
              </div>
              <p className="text-gray-600">
                <span className="font-medium">Phone: </span>
                {book.owner.mobileNumber}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2">
              {isBookOwner ? (
                <>
                  <Link to={`/edit-book/${book._id}`} className="btn-primary">
                    Edit Book
                  </Link>
                  <button onClick={handleDelete} className="btn-secondary text-red-600 border-red-200 hover:bg-red-50">
                    Delete Book
                  </button>
                  {statusUpdating ? (
                    <button disabled className="btn-secondary opacity-70">
                      Updating...
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStatusChange('available')}
                        className={`btn-secondary ${book.status === 'available' ? 'bg-green-50 border-green-200' : ''}`}
                        disabled={book.status === 'available'}
                      >
                        Mark Available
                      </button>
                      <button
                        onClick={() => handleStatusChange('rented')}
                        className={`btn-secondary ${book.status === 'rented' ? 'bg-yellow-50 border-yellow-200' : ''}`}
                        disabled={book.status === 'rented'}
                      >
                        Mark Rented
                      </button>
                      <button
                        onClick={() => handleStatusChange('exchanged')}
                        className={`btn-secondary ${book.status === 'exchanged' ? 'bg-gray-200 border-gray-300' : ''}`}
                        disabled={book.status === 'exchanged'}
                      >
                        Mark Exchanged
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <button
                  onClick={() => window.location.href = `mailto:${book.owner.email}?subject=Regarding your book: ${book.title}`}
                  className="btn-primary"
                >
                  Contact Owner
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetail; 