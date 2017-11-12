/**
 * Created by diogomatoschaves on 10/11/2017.
 */

import React, { Component } from 'react';
import Book from './Book.js';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI.js';
import { Link } from 'react-router-dom';


class ListBooks extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired
  };
  
  render () {

    const { books, changeShelf } = this.props;

    // currentlyReading = books.filter((book) => book.shelf === 'currentlyReading')

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {books.filter((book) => book.shelf === 'currentlyReading').map((book) => (
                  <li key={book.id}>
                    <Book
                      book={book}
                      changeShelf={changeShelf}
                    />
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
        <div className="list-books-content">
          <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {books.filter((book) => book.shelf === 'wantToRead').map((book) => (
                  <li key={book.id}>
                    <Book
                      book={book}
                      changeShelf={changeShelf}
                    />
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
        <div className="list-books-content">
          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {books.filter((book) => book.shelf === 'read').map((book) => (
                  <li key={book.id}>
                    <Book
                      book={book}
                      changeShelf={changeShelf}
                    />
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }  
}

export default ListBooks
