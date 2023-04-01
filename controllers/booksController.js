/* eslint-disable no-underscore-dangle */
const Books = require('../models/Books');

const getBooks = async (req, res) => {
  try {
    const books = await Books.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id, 'id from getBookByID');

    const book = await Books.findById(id);
    console.log(book, 'book from getBookById');
    if (!book) {
      return res.json('no book exists');
    }

    return res.json(book);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const createBook = async (req, res) => {
  try {
    const { title } = req.body;
    console.log(title, 'title da');
    if (!title) {
      return res.json('missing required field title');
    }

    const book = await Books.create({ title });
    // if (book) {
    console.log(book, 'book from createBook');
    return res.json(book);
    // }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const postComment = async (req, res) => {
  try {
    const { id } = req.body.params;
    const { comment } = req.body;
    console.log(id, 'id');
    console.log(comment, 'comment');
    if (!comment) {
      return res.json('missing required field comment');
    }
    const book = await Books.findById({ _id: id });
    console.log(book, 'book from postComment');
    if (!book) {
      return res.status(404).json('no book exists');
    }
    book.comments.push(comment);
    const updatedBook = await book.save();
    console.log(updatedBook, 'updatedBook from postComment after update');

    return res.json(updatedBook);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteBooks = async (req, res) => {
  try {
    const deleted = await Books.deleteMany({});
    if (!deleted) {
      console.log(deleted, 'deleted all books');
      return res.json('complete delete successful');
    }
    return res.json('complete delete successful');
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
const deleteBookById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id, 'id');
    const deleted = await Books.deleteOne({ _id: id });
    console.log(deleted, 'deleted book by ID');
    if (!deleted) {
      return res.json('no book exists');
    }
    return res.json('delete successful');
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getBooks, getBookById, createBook, postComment, deleteBooks, deleteBookById,
};
