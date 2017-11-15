/**
 * Created by diogomatoschaves on 10/11/2017.
 */

import React, { Component } from 'react';
import Shelf from './Shelf.js';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


class ListBooks extends Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired
  };
  
  render () {

    const { books, changeShelf } = this.props;
    
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <Shelf
          books={books.filter((book) => book.shelf === 'currentlyReading')}
          changeShelf={changeShelf}
          bookshelfTitle='Currently Reading'
        />
        <Shelf
          books={books.filter((book) => book.shelf === 'wantToRead')}
          changeShelf={changeShelf}
          bookshelfTitle='Want to Read'
        />
        <Shelf
          books={books.filter((book) => book.shelf === 'read')}
          changeShelf={changeShelf}
          bookshelfTitle='Read'
        />
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }  
}

export default ListBooks
