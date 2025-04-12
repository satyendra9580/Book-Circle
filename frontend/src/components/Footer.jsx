import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">BookCircle</h3>
            <p className="text-gray-600 mb-4">
              Connect with book lovers in your community. Share knowledge and stories through books.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-primary-600">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/books" className="text-gray-600 hover:text-primary-600">
                  Browse Books
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-600 hover:text-primary-600">
                  Join Now
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact</h3>
            <p className="text-gray-600 mb-2">
              Need help? Contact us
            </p>
            <p className="text-gray-600 mb-2">
              Email: info@bookcircle.com
            </p>
            <p className="text-gray-600">
              Phone: +1 (555) 123-4567
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-600">
            &copy; {new Date().getFullYear()} BookCircle. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 