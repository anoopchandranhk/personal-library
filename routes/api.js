/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/*
*
*
*       Complete the API routing below
*
*
*/

const {
  getBooks, createBook, deleteBooks, postComment, deleteBookById, getBookById,
} = require('../controllers/booksController');

module.exports = (app) => {
  app.route('/api/books')
    .get(getBooks)

    .post(createBook)

    .delete(deleteBooks);

  app.route('/api/books/:id')
    .get(getBookById)

    .post(postComment)

    .delete(deleteBookById);
};
