import { Link } from 'react-router-dom';
import { BookOpenIcon } from '@heroicons/react/24/outline';

function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <BookOpenIcon className="h-8 w-8 text-white" />
            <span className="ml-2 text-2xl font-bold text-white">
              Library Management
            </span>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-6">
            <Link
              to="/"
              className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-lg font-medium transition-colors"
            >
              Books
            </Link>
            <Link
              to="/books/new"
              className="bg-white text-indigo-600 px-4 py-2 rounded-md text-lg font-medium hover:bg-gray-100 transition-all shadow-md"
            >
              Add Book
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;