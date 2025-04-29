const express = require('express');
const router = express.Router();
const { getAllUsers, createUser, borrowBook, returnBook } = require('../controllers/usersControllers.js');

router.get('/', getAllUsers);
router.post('/', createUser);
router.post('/:id/borrow', borrowBook);
router.post('/:id/return', returnBook);

module.exports = router;
