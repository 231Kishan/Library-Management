import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeftIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

const API_URL = 'http://localhost:5000/api';

function BookDetails() {
  const [book, setBook] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchBook();
  }, [id]);

  const fetchBook = async () => {
    try {
      const response = await axios.get(`${API_URL}/books/${id}`);
      setBook(response.data);
    } catch (error) {
      console.error('Error fetching book:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${API_URL}/books/${id}`);
      navigate('/');
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (!book) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <button
        onClick={() => navigate('/')}
        className="flex items-center text-gray-600 hover:text-primary-600 mb-6"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        Back to Books
      </button>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{book.title}</h1>
          <div className="space-y-4 text-gray-600">
            <div>
              <span className="font-medium">Author:</span>{' '}
              <span className="text-gray-800">{book.author}</span>
            </div>
            <div>
              <span className="font-medium">ISBN:</span>{' '}
              <span className="text-gray-800">{book.ISBN}</span>
            </div>
            <div>
              <span className="font-medium">Published Date:</span>{' '}
              <span className="text-gray-800">{formatDate(book.publishedDate)}</span>
            </div>
            {book.genre && (
              <div>
                <span className="font-medium">Genre:</span>{' '}
                <span className="text-gray-800">{book.genre}</span>
              </div>
            )}
            <div>
              <span className="font-medium">Copies Available:</span>{' '}
              <span className={`font-semibold ${
                book.copiesAvailable > 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {book.copiesAvailable}
              </span>
            </div>
          </div>

          <div className="flex space-x-4 mt-8">
            <button
              onClick={() => navigate(`/books/${id}/edit`)}
              className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
            >
              <PencilIcon className="h-5 w-5 mr-2" />
              Edit Book
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              <TrashIcon className="h-5 w-5 mr-2" />
              Delete Book
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetails;