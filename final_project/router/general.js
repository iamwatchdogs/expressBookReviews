const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) {
      users.push({ username: username, password: password });
      return res
        .status(200)
        .json({ message: "User successfully registered, you can now login." });
    } else {
      return res.status(404).json({
        message:
          "User already exists, please try again with a different username.",
      });
    }
  }
  return res.status(404).json({
    message: "A error ocurred when trying to register user, please try again.",
  });
});

// Get the book list available in the shop
public_users.get("/", async function (req, res) {
  try {
    const response = await axios.get("URL_TO_GET_BOOKS");
    const books = response.data;
    res.status(200).json(books);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching books", error: error.message });
  }
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", async function (req, res) {
  const isbn = req.params.isbn;
  try {
    const response = await axios.get(`URL_TO_GET_BOOK_BY_ISBN/${isbn}`); // Replace with the actual URL or API endpoint
    const book = response.data;
    res.status(200).json(book);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching book details", error: error.message });
  }
});

// Get book details based on author
public_users.get("/author/:author", async function (req, res) {
  const author = req.params.author;
  try {
    const response = await axios.get(`URL_TO_GET_BOOKS_BY_AUTHOR/${author}`);
    const booksByAuthor = response.data;
    res.status(200).json(booksByAuthor);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching books by author",
      error: error.message,
    });
  }
});

// Get all books based on title
public_users.get("/title/:title", async function (req, res) {
  const title = req.params.title;
  try {
    const response = await axios.get(`URL_TO_GET_BOOKS_BY_TITLE/${title}`);
    const booksByTitle = response.data;
    res.status(200).json(booksByTitle);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching books by title", error: error.message });
  }
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  const isbn = req.params.isbn;
  res.send(books[isbn].reviews);
});

module.exports.general = public_users;
