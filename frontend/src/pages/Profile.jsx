import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { bookApi } from '../utils/api';
import BookCard from '../components/BookCard';

function Profile() {
  const { currentUser, isOwner } = useAuth();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOwner()) {
      fetchUserBooks();
    } else {
      setLoading(false);
    }
  }, [currentUser]);

  const fetchUserBooks = async () => {
    try {
      setLoading(true);
      const response = await bookApi.getMyBooks();
      setBooks(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user books:', error);
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">My Profile</h1>
        <p className="text-gray-600">
          Manage your account and listed books
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="md:col-span-1">
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 bg-primary-600 rounded-full flex items-center justify-center text-white text-3xl mb-4">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
              <h2 className="text-xl font-semibold text-gray-800">{currentUser.name}</h2>
              <p className="text-gray-600">{currentUser.role === 'owner' ? 'Book Owner' : 'Book Seeker'}</p>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <div className="mb-3">
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p className="text-gray-800">{currentUser.email}</p>
              </div>
              <div className="mb-3">
                <h3 className="text-sm font-medium text-gray-500">Mobile Number</h3>
                <p className="text-gray-800">{currentUser.mobileNumber}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Member Since</h3>
                <p className="text-gray-800">
                  {new Date(currentUser.createdAt).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Books Section */}
        <div className="md:col-span-2">
          {isOwner() ? (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">My Books</h2>
                <Link to="/add-book" className="btn-primary">
                  Add New Book
                </Link>
              </div>

              {loading ? (
                <div className="flex justify-center py-12">
                  <div className="w-10 h-10 border-4 border-primary-500 rounded-full border-t-transparent animate-spin"></div>
                </div>
              ) : books.length === 0 ? (
                <div className="bg-white shadow-md rounded-lg p-8 text-center">
                  <h3 className="text-xl font-medium text-gray-700 mb-2">No books listed yet</h3>
                  <p className="text-gray-500 mb-4">Start sharing your books with the community!</p>
                  <Link to="/add-book" className="btn-primary">
                    Add Your First Book
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {books.map((book) => (
                    <BookCard key={book._id} book={book} />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white shadow-md rounded-lg p-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Welcome, Book Seeker!</h2>
              <p className="text-gray-600 mb-6">
                As a Book Seeker, you can browse and contact book owners to borrow or exchange books.
              </p>
              <Link to="/books" className="btn-primary">
                Browse Available Books
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile; 