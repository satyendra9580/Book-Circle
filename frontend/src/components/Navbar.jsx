import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { currentUser, logout, isOwner } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-2xl font-bold text-primary-600">
                BookCircle
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <Link to="/" className="px-3 py-2 text-gray-700 hover:text-primary-600">
                Home
              </Link>
              <Link to="/books" className="px-3 py-2 text-gray-700 hover:text-primary-600">
                Browse Books
              </Link>
              {currentUser && isOwner() && (
                <Link to="/add-book" className="px-3 py-2 text-gray-700 hover:text-primary-600">
                  Add Book
                </Link>
              )}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {currentUser ? (
              <div className="flex items-center">
                <Link to="/profile" className="px-3 py-2 text-gray-700 hover:text-primary-600">
                  My Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="ml-3 px-3 py-2 text-gray-700 hover:text-primary-600"
                >
                  Logout
                </button>
                <div className="ml-3 relative">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-primary-600 text-white">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center">
                <Link to="/login" className="px-3 py-2 text-gray-700 hover:text-primary-600">
                  Login
                </Link>
                <Link to="/register" className="ml-3 btn-primary">
                  Register
                </Link>
              </div>
            )}
          </div>
          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50"
            >
              Home
            </Link>
            <Link
              to="/books"
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50"
            >
              Browse Books
            </Link>
            {currentUser && isOwner() && (
              <Link
                to="/add-book"
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50"
              >
                Add Book
              </Link>
            )}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {currentUser ? (
              <div className="space-y-1">
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary-600 text-white">
                      {currentUser.name.charAt(0).toUpperCase()}
                    </div>
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">{currentUser.name}</div>
                    <div className="text-sm font-medium text-gray-500">{currentUser.email}</div>
                  </div>
                </div>
                <Link
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                >
                  My Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-1 px-4">
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar; 