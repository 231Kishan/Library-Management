const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const booksRoutes = require('./routes/booksRoutes');
const usersRoutes = require('./routes/userRoutes');
require("dotenv").config()
const app = express();
const PORT = process.env.PORT||5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

app.use(cors());
app.use(express.json());

app.use('/api/books', booksRoutes);
app.use('/api/users', usersRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server error" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
