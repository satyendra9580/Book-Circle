import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { bookApi } from '../utils/api';
import BookCard from '../components/BookCard';

function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await bookApi.getAllBooks();
        setBooks(response.data.slice(0, 6)); // Display only the first 6 books
        setLoading(false);
      } catch (error) {
        console.error('Error fetching books:', error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white rounded-2xl p-8 mb-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl font-bold mb-4">
              Connect with Book Lovers in Your Community
            </h1>
            <p className="text-lg mb-6 opacity-90">
              BookCircle helps you share your books with others and discover new reads from people around you.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/register" className="px-6 py-3 bg-white text-primary-700 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Join Now
              </Link>
              <Link to="/books" className="px-6 py-3 bg-primary-700 text-white rounded-lg font-semibold border border-white hover:bg-primary-800 transition-colors">
                Browse Books
              </Link>
            </div>
          </div>
          <div className="hidden md:block relative">
            <div className="relative h-80 flex items-center justify-center">
              <div className="absolute w-48 h-60 bg-white shadow-lg rounded-lg transform rotate-6 -ml-16 -mt-5 z-0">
                {/* Book cover */}
              </div>
              <div className="absolute w-48 h-60 bg-white shadow-lg rounded-lg transform -rotate-6 ml-16 mt-5 z-10">
                {/* Book cover */}
              </div>
              <div className="absolute w-48 h-60 bg-white shadow-lg rounded-lg z-20">
                {/* Main book cover */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="mb-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">How BookCircle Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Connect with fellow book lovers in your community and share your favorite reads.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="bg-primary-100 text-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Create a Profile</h3>
            <p className="text-gray-600">
              Sign up as a Book Owner or Book Seeker and fill in your details.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="bg-primary-100 text-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">List or Browse Books</h3>
            <p className="text-gray-600">
              Book Owners can list their books, while Seekers can browse available titles.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="bg-primary-100 text-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Connect & Exchange</h3>
            <p className="text-gray-600">
              Contact book owners and arrange to borrow, rent or exchange books.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Featured Books</h2>
          <Link to="/books" className="text-primary-600 hover:underline">
            View All
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center">
            <div className="w-10 h-10 border-4 border-primary-500 rounded-full border-t-transparent animate-spin"></div>
          </div>
        ) : books.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <h3 className="text-xl font-medium text-gray-700 mb-2">No books available yet</h3>
            <p className="text-gray-500 mb-4">Be the first to add a book to our platform!</p>
            <Link to="/add-book" className="btn-primary">
              Add a Book
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        )}
      </section>

      {/* Join Community Section */}
      <section className="bg-primary-50 rounded-xl p-8 mb-12">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Join Our Book Loving Community
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Connect with fellow readers, build your virtual library, and discover new books from people around you.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/register" className="btn-primary">
              Create Account
            </Link>
            <Link to="/books" className="btn-secondary">
              Browse Books
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home; 