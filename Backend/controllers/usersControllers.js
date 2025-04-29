const User = require('../models/User');
const Book = require('../models/Book');

async function getAllUsers(req, res) {
  const users = await User.find().populate('borrowedBooks.bookId');
  res.json(users);
}

async function createUser(req, res) {
  try {
    const { name, email, password } = req.body;

    // Step 1: Check if user already exists by email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    // Step 2: If user does not exist, create and save the new user
    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json(user); // Return the created user as response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

async function borrowBook(req, res) {
  const { bookId } = req.body;
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  const book = await Book.findById(bookId);
  if (!book) return res.status(404).json({ message: "Book not found" });

  if (book.copiesAvailable <= 0) {
    return res.status(400).json({ message: "No copies available" });
  }

  user.borrowedBooks.push({ bookId });
  book.copiesAvailable -= 1;

  await user.save();
  await book.save();

  res.status(200).json({ message: "Book borrowed successfully" });
}

async function returnBook(req, res) {
  const { bookId } = req.body;
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });

  const borrowEntry = user.borrowedBooks.find(b => b.bookId.toString() === bookId && !b.returnDate);
  if (!borrowEntry) {
    return res.status(400).json({ message: "Book not currently borrowed" });
  }

  borrowEntry.returnDate = new Date();

  const book = await Book.findById(bookId);
  if (book) book.copiesAvailable += 1;

  await user.save();
  await book.save();

  res.status(200).json({ message: "Book returned successfully" });
}

module.exports = { getAllUsers, createUser, borrowBook, returnBook };
