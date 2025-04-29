const Book = require('../models/Book.js');

async function getAllBooks(req, res) {
  const books = await Book.find();
  res.json(books);
}

async function getBookById(req, res) {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
}

async function createBook(req, res) {
  const book = new Book(req.body);
  await book.save();
  res.status(201).json(book);
}

async function updateBook(req, res) {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
}

async function deleteBook(req, res) {
  const book = await Book.findByIdAndDelete(req.params.id);
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.status(204).send();
}

module.exports = { getAllBooks, getBookById, createBook, updateBook, deleteBook };
