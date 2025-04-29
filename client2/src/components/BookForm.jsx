import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

function BookForm() {
  const [book, setBook] = useState({
    title: '',
    author: '',
    ISBN: '',
    publishedDate: '',
    genre: '',
    copiesAvailable: 1
  });
  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  useEffect(() => {
    if (isEdit) {
      fetchBook();
    }
  }, [id]);

  const fetchBook = async () => {
    try {
      const response = await axios.get(`${API_URL}/books/${id}`);
      const bookData = response.data;
      // Format the date for the input field
      bookData.publishedDate = new Date(bookData.publishedDate).toISOString().split('T')[0];
      setBook(bookData);
    } catch (error) {
      console.error('Error fetching book:', error);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!book.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!book.author.trim()) {
      newErrors.author = 'Author is required';
    }
    
    if (!book.ISBN.trim()) {
      newErrors.ISBN = 'ISBN is required';
    } else if (!/^\d{10,13}$/.test(book.ISBN)) {
      newErrors.ISBN = 'ISBN must be 10-13 digits';
    }
    
    if (!book.publishedDate) {
      newErrors.publishedDate = 'Published date is required';
    } else if (new Date(book.publishedDate) > new Date()) {
      newErrors.publishedDate = 'Published date cannot be in the future';
    }
    
    if (book.copiesAvailable < 0) {
      newErrors.copiesAvailable = 'Copies available cannot be negative';
    } else if (!Number.isInteger(book.copiesAvailable)) {
      newErrors.copiesAvailable = 'Copies available must be a whole number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook(prev => ({
      ...prev,
      [name]: name === 'copiesAvailable' ? parseInt(value) || 0 : value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      if (isEdit) {
        await axios.put(`${API_URL}/books/${id}`, book);
      } else {
        await axios.post(`${API_URL}/books`, book);
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving book:', error);
      if (error.response?.data?.message) {
        setErrors(prev => ({ ...prev, form: error.response.data.message }));
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        {isEdit ? 'Edit Book' : 'Add New Book'}
      </h1>
      
      {errors.form && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          {errors.form}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title *
          </label>
          <input
            type="text"
            name="title"
            id="title"
            value={book.title}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md shadow-sm ${
              errors.title ? 'border-red-500' : 'border-gray-300'
            } focus:border-primary-500 focus:ring-primary-500`}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title}</p>
          )}
        </div>

        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700">
            Author *
          </label>
          <input
            type="text"
            name="author"
            id="author"
            value={book.author}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md shadow-sm ${
              errors.author ? 'border-red-500' : 'border-gray-300'
            } focus:border-primary-500 focus:ring-primary-500`}
          />
          {errors.author && (
            <p className="mt-1 text-sm text-red-600">{errors.author}</p>
          )}
        </div>

        <div>
          <label htmlFor="ISBN" className="block text-sm font-medium text-gray-700">
            ISBN *
          </label>
          <input
            type="text"
            name="ISBN"
            id="ISBN"
            value={book.ISBN}
            onChange={handleChange}
            placeholder="10-13 digits"
            className={`mt-1 block w-full rounded-md shadow-sm ${
              errors.ISBN ? 'border-red-500' : 'border-gray-300'
            } focus:border-primary-500 focus:ring-primary-500`}
          />
          {errors.ISBN && (
            <p className="mt-1 text-sm text-red-600">{errors.ISBN}</p>
          )}
        </div>

        <div>
          <label htmlFor="publishedDate" className="block text-sm font-medium text-gray-700">
            Published Date *
          </label>
          <input
            type="date"
            name="publishedDate"
            id="publishedDate"
            value={book.publishedDate}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md shadow-sm ${
              errors.publishedDate ? 'border-red-500' : 'border-gray-300'
            } focus:border-primary-500 focus:ring-primary-500`}
          />
          {errors.publishedDate && (
            <p className="mt-1 text-sm text-red-600">{errors.publishedDate}</p>
          )}
        </div>

        <div>
          <label htmlFor="genre" className="block text-sm font-medium text-gray-700">
            Genre
          </label>
          <input
            type="text"
            name="genre"
            id="genre"
            value={book.genre}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
          />
        </div>

        <div>
          <label htmlFor="copiesAvailable" className="block text-sm font-medium text-gray-700">
            Copies Available *
          </label>
          <input
            type="number"
            name="copiesAvailable"
            id="copiesAvailable"
            value={book.copiesAvailable}
            onChange={handleChange}
            min="0"
            step="1"
            className={`mt-1 block w-full rounded-md shadow-sm ${
              errors.copiesAvailable ? 'border-red-500' : 'border-gray-300'
            } focus:border-primary-500 focus:ring-primary-500`}
          />
          {errors.copiesAvailable && (
            <p className="mt-1 text-sm text-red-600">{errors.copiesAvailable}</p>
          )}
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="flex-1 bg-primary-600 text- px-black py-2 rounded-md hover:bg-primary-700 transition-colors"
          >
            {isEdit ? 'Update Book' : 'Add Book'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default BookForm;