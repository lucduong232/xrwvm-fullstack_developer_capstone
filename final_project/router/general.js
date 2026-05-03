const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios'); // Quan trọng: Phải có dòng này

// Task 10: Get the list of books available in the shop using async-await
public_users.get('/', async function (req, res) {
  try {
    // Trong thực tế lab, bạn có thể gọi đến chính endpoint của mình hoặc trả về promise
    const getBooks = () => Promise.resolve(books);
    const result = await getBooks();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({message: "Error retrieving books"});
  }
});

// Task 11: Get book details based on ISBN using Promises
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const getBook = new Promise((resolve, reject) => {
    if (books[isbn]) {
      resolve(books[isbn]);
    } else {
      reject("Book not found");
    }
  });

  getBook
    .then((book) => res.status(200).json(book))
    .catch((err) => res.status(404).json({message: err}));
});

// Task 12: Get book details based on author using async-await
public_users.get('/author/:author', async function (req, res) {
  const author = req.params.author;
  try {
    const getBooksByAuthor = Object.values(books).filter(b => b.author === author);
    res.status(200).json(getBooksByAuthor);
  } catch (error) {
    res.status(500).json({message: "Error retrieving books by author"});
  }
});

// Task 13: Get book details based on title using Promises
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;
  const getByTitle = new Promise((resolve, reject) => {
    const filteredBooks = Object.values(books).filter(b => b.title === title);
    if (filteredBooks.length > 0) {
      resolve(filteredBooks);
    } else {
      reject("Book not found");
    }
  });

  getByTitle
    .then(result => res.status(200).json(result))
    .catch(err => res.status(404).json({message: err}));
});

module.exports.general = public_users;
