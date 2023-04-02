/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable no-undef */
/*
*
*
*       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]-----
*
*/

const chaiHttp = require('chai-http');
const chai = require('chai');

const { assert } = chai;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {
  /*
  * ----[EXAMPLE TEST]----
  * Each test should completely test the response of the API end-point including response status code!
  */
  test('#example Test GET /api/books', (done) => {
    chai.request(server)
      .get('/api/books')
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.isArray(res.body, 'response should be an array');
        assert.property(res.body[0], 'commentcount', 'Books in array should contain commentcount');
        assert.property(res.body[0], 'title', 'Books in array should contain title');
        assert.property(res.body[0], '_id', 'Books in array should contain _id');
        done();
      });
  });
  /*
  * ----[END of EXAMPLE TEST]----
  */
  let testId;
  suite('Routing tests', () => {
    suite('POST /api/books with title => create book object/expect book object', () => {
      test('Test POST /api/books with title', (done) => {
        chai.request(server)
          .post('/api/books')
          .send({ title: 'My test book' })
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'response should be an Object');
            assert.property(res.body, 'title', 'Books in array should contain title');
            assert.property(res.body, '_id', 'Books in array should contain _id');
            testId = res.body._id;
            assert.equal(res.body.title, 'My test book', 'Title should match');
            done();
          });
      });

      test('Test POST /api/books with no title given', (done) => {
        chai.request(server)
          .post('/api/books')
          .send({ title: '' })
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.isString(res.body, 'response should be a String');
            assert.equal(res.body, 'missing required field title', 'Missing title warning should be present');
            done();
          });
      });
    });

    suite('GET /api/books => array of books', () => {
      test('Test GET /api/books', (done) => {
        chai.request(server)
          .get('/api/books')
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.isArray(res.body, 'response should be an array');
            assert.property(res.body[0], 'title', 'Books in array should contain title');
            assert.property(res.body[0], '_id', 'Books in array should contain _id');
            done();
          });
      });
    });

    suite('GET /api/books/[id] => book object with [id]', () => {
      test('Test GET /api/books/[id] with id not in db', (done) => {
        chai.request(server)
          .get('/api/books/12345')
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.isString(res.body, 'response should be a String');
            assert.equal(res.body, 'no book exists', 'Eror message should match');
            done();
          });
      });

      test('Test GET /api/books/[id] with valid id in db', (done) => {
        chai.request(server)
          .get(`/api/books/${testId}`)
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'response should be an Object');
            assert.property(res.body, 'title', 'Books should contain title');
            assert.property(res.body, '_id', 'Book should contain _id');
            assert.property(res.body, 'comments', 'Book should contain comments');
            assert.property(res.body, 'commentcount', 'Book should contain commentcount');
            assert.equal(res.body.title, 'My test book', 'Book title should be correct');
            assert.equal(res.body.commentcount, '0', 'Book commentcount should be zero');
            done();
          });
      });
    });

    suite('POST /api/books/[id] => add comment/expect book object with id', () => {
      test('Test POST /api/books/[id] with comment', (done) => {
        chai.request(server)
          .post(`/api/books/${testId}`)
          .send({ comment: 'This is a test comment' })
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'response should be an Object');
            assert.property(res.body, 'title', 'Books should contain title');
            assert.property(res.body, '_id', 'Books should contain _id');
            assert.property(res.body, 'comments', 'Books should contain comments');
            assert.property(res.body, 'commentcount', 'Books should contain commentcount');
            assert.equal(res.body.title, 'My test book', 'Book title should be correct');
            assert.equal(res.body.commentcount, '1', 'Book commentcount should be one');
            assert.equal(res.body.comments[0], 'This is a test comment', 'Book comment should be correct');
            done();
          });
      });

      test('Test POST /api/books/[id] without comment field', (done) => {
        chai.request(server)
          .post(`/api/books/${testId}`)
          .send({ comment: '' })
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.isString(res.body, 'response should be a String');
            assert.equal(res.body, 'missing required field comment', 'Error message should be correct');
            done();
          });
      });

      test('Test POST /api/books/[id] with comment, id not in db', (done) => {
        chai.request(server)
          .post('/api/books/123')
          .send({ comment: 'This is a test comment' })
          .end((err, res) => {
            assert.equal(res.status, 500);
            assert.isString(res.body, 'response should be a String');
            assert.equal(res.body, 'no book exists', 'Error message should match');
            done();
          });
      });
    });

    suite('DELETE /api/books/[id] => delete book object id', () => {
      test('Test DELETE /api/books/[id] with valid id in db', (done) => {
        chai.request(server)
          .delete(`/api/books/${testId}`)
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.isString(res.body, 'response should be a String');
            assert.equal(res.body, 'delete successful', 'Error message should be correct');
            done();
          });
      });

      test('Test DELETE /api/books/[id] with  id not in db', (done) => {
        chai.request(server)
          .delete('/api/books/123')
          .end((err, res) => {
            assert.equal(res.status, 500);
            assert.isString(res.body, 'response should be a String');
            assert.equal(res.body, 'no book exists', 'Error message should be correct');
            done();
          });
        chai.request(server)
          .delete('/api/books/12345')
          .end((err, res) => {
            assert.equal(res.status, 200);
            assert.isString(res.body, 'response should be a String');
            assert.equal(res.body, 'no book exists', 'Error message should match');
            done();
          });
      });
    });
  });
});
