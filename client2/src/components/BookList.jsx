import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';

const API_URL = 'http://localhost:5000/api';

function BookList() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${API_URL}/books`);
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/books/${id}`);
      fetchBooks();
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Book Collection</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div
            key={book._id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {book.title}
              </h2>
              <div className="space-y-2 text-sm text-gray-600">
                <p><span className="font-medium">Author:</span> {book.author}</p>
                <p><span className="font-medium">ISBN:</span> {book.ISBN}</p>
                <p><span className="font-medium">Published:</span> {formatDate(book.publishedDate)}</p>
                {book.genre && (
                  <p><span className="font-medium">Genre:</span> {book.genre}</p>
                )}
                <p>
                  <span className="font-medium">Copies Available:</span>{' '}
                  <span className={`font-semibold ${
                    book.copiesAvailable > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {book.copiesAvailable}
                  </span>
                </p>
              </div>
              <div className="flex space-x-2 mt-4">
                <button
                  onClick={() => navigate(`/books/${book._id}`)}
                  className="flex items-center px-3 py-1 bg-primary-100 text-primary-700 rounded-md hover:bg-primary-200 transition-colors"
                >
                  <EyeIcon className="h-4 w-4 mr-1" />
                  View
                </button>
                <button
                  onClick={() => navigate(`/books/${book._id}/edit`)}
                  className="flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
                >
                  <PencilIcon className="h-4 w-4 mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(book._id)}
                  className="flex items-center px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
                >
                  <TrashIcon className="h-4 w-4 mr-1" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BookList;