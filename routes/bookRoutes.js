const express = require('express');
const bookController = require('../controllers/bookController');
const router = express.Router();

// Routes for books
router.get('/', bookController.getBookList);            // Task 1: Get all books
router.get('/isbn/:isbn', bookController.getBookByISBN);  // Task 2: Get book by ISBN
router.get('/author/:author', bookController.getBooksByAuthor);  // Task 3: Get books by Author
router.get('/title/:title', bookController.getBooksByTitle);    // Task 4: Get books by Title
router.get('/:isbn/reviews', bookController.getBookReview);  // Task 5: Get book review

module.exports = router;
