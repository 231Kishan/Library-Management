const express = require('express');
const router = express.Router();
const { validateBook } = require('../middlewares/validateMiddleware.js');
const { getAllBooks, getBookById, createBook, updateBook, deleteBook } = require('../controllers/bookControllers.js');

router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.post('/', validateBook, createBook);
router.put('/:id', validateBook, updateBook);
router.delete('/:id', deleteBook);

module.exports = router;
