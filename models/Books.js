const mongoose = require('mongoose');

const BooksSchema = new mongoose.Schema({
  title: String,
  comments: [String],
  commentcount: {
    type: Number,
    default: 0,
  },
});

const Books = mongoose.model('Book', BooksSchema);

module.exports = Books;
