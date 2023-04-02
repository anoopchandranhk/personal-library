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
    if (!book) {
      return res.json('no book exists');
    }

    return res.json(book);
  } catch (err) {
    return res.json('no book exists');
  }
};

const createBook = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.json('missing required field title');
    }

    const book = await Books.create({ title });
    return res.json(book);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const postComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;
    console.log(id, 'id from post comment');
    console.log(comment, 'comment from post comment');
    if (!comment) {
      return res.json('missing required field comment');
    }
    const book = await Books.findById({ _id: id });
    console.log(book, 'book from postComment');
    if (!book) {
      return res.json('no book exists');
    }
    book.comments.push(comment);
    book.commentcount += 1;
    const updatedBook = await book.save();
    console.log(updatedBook, 'updatedBook from postComment after update');

    return res.json(updatedBook);
  } catch (err) {
    return res.status(500).json('no book exists');
  }
};

const deleteBooks = async (req, res) => {
  try {
    const deleted = await Books.deleteMany({});
    if (!deleted) {
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
    if (deleted.deletedCount === 1) {
      return res.json('delete successful');
    }
    return res.json('no book exists');
  } catch (err) {
    return res.status(500).json('no book exists');
  }
};

module.exports = {
  getBooks, getBookById, createBook, postComment, deleteBooks, deleteBookById,
};
