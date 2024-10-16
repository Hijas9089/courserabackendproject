const axios = require('axios');

// Sample book data
const books = [
  { ISBN: "123", title: "Book One", author: "Author A", reviews: [] },
  { ISBN: "456", title: "Book Two", author: "Author B", reviews: [] },
  { ISBN: "789", title: "Book Three", author: "Author A", reviews: [] }
];

// Task 1: Get the book list
exports.getBookList = async (req, res) => {
  try {
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving book list." });
  }
};

// Task 2: Get books by ISBN
exports.getBookByISBN = async (req, res) => {
  const { isbn } = req.params;
  const book = books.find(b => b.ISBN === isbn);
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ message: "Book not found." });
  }
};

// Task 3: Get books by Author
exports.getBooksByAuthor = async (req, res) => {
  const { author } = req.params;
  const authorBooks = books.filter(b => b.author === author);
  if (authorBooks.length > 0) {
    res.status(200).json(authorBooks);
  } else {
    res.status(404).json({ message: "No books found by this author." });
  }
};

// Task 4: Get books by Title
exports.getBooksByTitle = async (req, res) => {
  const { title } = req.params;
  const titleBooks = books.filter(b => b.title.includes(title));
  if (titleBooks.length > 0) {
    res.status(200).json(titleBooks);
  } else {
    res.status(404).json({ message: "No books found with this title." });
  }
};

// Task 5: Get book review
exports.getBookReview = async (req, res) => {
  const { isbn } = req.params;
  const book = books.find(b => b.ISBN === isbn);
  if (book && book.reviews.length > 0) {
    res.status(200).json(book.reviews);
  } else {
    res.status(404).json({ message: "No reviews for this book." });
  }
};




///////////////////////////////////////////////////////////////
// Task 8: Add/Modify a book review
exports.addOrModifyReview = async (req, res) => {
    const { isbn } = req.params;
    const { review } = req.body;
    const userId = req.userId;  // Get userId from JWT token
  
    const book = books.find(b => b.ISBN === isbn);
    if (book) {
      const existingReview = book.reviews.find(r => r.userId === userId);
      if (existingReview) {
        existingReview.text = review;  // Modify existing review
      } else {
        book.reviews.push({ userId, text: review });  // Add new review
      }
      res.status(200).json({ message: "Review added/modified successfully." });
    } else {
      res.status(404).json({ message: "Book not found." });
    }
  };
  
  // Task 9: Delete review
  exports.deleteReview = async (req, res) => {
    const { isbn } = req.params;
    const userId = req.userId;
  
    const book = books.find(b => b.ISBN === isbn);
    if (book) {
      const reviewIndex = book.reviews.findIndex(r => r.userId === userId);
      if (reviewIndex > -1) {
        book.reviews.splice(reviewIndex, 1);
        res.status(200).json({ message: "Review deleted successfully." });
      } else {
        res.status(404).json({ message: "Review not found for this user." });
      }
    } else {
      res.status(404).json({ message: "Book not found." });
    }
  };
  

  // Task 10: Get all books using async callback function
exports.getAllBooks = (req, res) => {
    axios.get('https://api.example.com/books')
      .then(response => res.status(200).json(response.data))
      .catch(error => res.status(500).json({ message: "Error fetching books." }));
  };
  
  // Task 11: Search by ISBN using Promises
  exports.searchByISBN = (req, res) => {
    const { isbn } = req.params;
    axios.get(`https://api.example.com/books/${isbn}`)
      .then(response => res.status(200).json(response.data))
      .catch(error => res.status(500).json({ message: "Error searching for book by ISBN." }));
  };
  