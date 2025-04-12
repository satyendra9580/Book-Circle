import React from 'react';
import { Link } from 'react-router-dom';

function BookCard({ book }) {
  return (
    <Link to={`/books/${book._id}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden card-hover transition-all duration-300">
        <div className="relative pb-[70%]">
          <img
            src={book.coverImage || 'https://via.placeholder.com/300x400?text=No+Cover'}
            alt={book.title}
            className="absolute h-full w-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <div className="text-white font-semibold line-clamp-2 text-lg">
              {book.title}
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <p className="text-gray-700 text-sm">By {book.author}</p>
            <span className="px-2 py-1 text-xs font-semibold rounded-full bg-primary-100 text-primary-800">
              {book.genre}
            </span>
          </div>
          <div className="mt-2">
            <p className="text-gray-600 text-sm flex items-center">
              <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {book.location}
            </p>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center text-white text-xs">
                {book.owner?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <span className="ml-2 text-xs text-gray-600">{book.owner?.name || 'Unknown'}</span>
            </div>
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
              book.status === 'available' 
                ? 'bg-green-100 text-green-800' 
                : book.status === 'rented' 
                ? 'bg-yellow-100 text-yellow-800' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              {book.status === 'available' ? 'Available' : book.status === 'rented' ? 'Rented' : 'Exchanged'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BookCard; 