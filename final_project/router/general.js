const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios'); // Quan trọng: Phải có dòng này

// Task 6: Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    res.status(200).json(books[isbn].reviews);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});
// Task 7: Register a new user
public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    const userExists = users.filter((user) => user.username === username);
    if (userExists.length === 0) {
      users.push({ "username": username, "password": password });
      return res.status(200).json({ message: "User successfully registered. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  return res.status(404).json({ message: "Unable to register user." });
});
/ Task 10: Get the list of books available in the shop using async-await
public_users.get('/', async function (req, res) {
  try {
    // Giả lập gọi API lấy danh sách sách bằng async/await
    const response = await Promise.resolve(books);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving books" });
  }
});

// Task 11: Get book details based on ISBN using Promises
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const getBookByISBN = new Promise((resolve, reject) => {
    if (books[isbn]) {
      resolve(books[isbn]);
    } else {
      reject("Book not found");
    }
  });

  getBookByISBN
    .then((book) => res.status(200).json(book))
    .catch((err) => res.status(404).json({ message: err }));
});

// Task 12: Get book details based on author using async-await
public_users.get('/author/:author', async function (req, res) {
  const author = req.params.author;
  try {
    const getBooks = new Promise((resolve) => {
      const filteredBooks = Object.values(books).filter(b => b.author === author);
      resolve(filteredBooks);
    });
    const result = await getBooks;
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving books by author" });
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
    .catch(err => res.status(404).json({ message: err }));
});

// Task 6: Get book review (Đảm bảo vẫn giữ code này)
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  if (books[isbn]) {
    res.status(200).json(books[isbn].reviews);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

module.exports.general = public_users;