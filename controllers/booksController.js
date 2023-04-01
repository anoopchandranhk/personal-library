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

    const book = await Books.findById(id);
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
      return res.status(400).json('missing required field title');
    }

    const book = await Books.create({ title });
    // if (book) {
    console.log(book, 'book da');
    return res.json(book);
    // }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const postComment = async (req, res) => {
  try {
    const { id, comment } = req.body;
    console.log(id, 'id');
    console.log(comment, 'comment');
    const book = await Books.findById({ _id: id });
    console.log(book, 'book da');
    if (!book) {
      return res.status(404).json('no book exists');
    }
    book.comments.push(comment);
    await book.save();
    return res.json(book);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteBooks = async (req, res) => {
  try {
    const deleted = await Books.deleteMany({});
    if (deleted) {
      res.json('complete delete successful');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const deleteBookById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id, 'id');
    const deleted = await Books.deleteOne({ _id: id });
    if (deleted) {
      res.json('complete delete successful');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getBooks, getBookById, createBook, postComment, deleteBooks, deleteBookById,
};
