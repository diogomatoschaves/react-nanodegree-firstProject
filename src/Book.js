/**
 * Created by diogomatoschaves on 10/11/2017.
 */

import React from 'react'
import PropTypes from 'prop-types'

const Book = (props) => {

  const { authors: bookAuthors, title } = props.book;
  const value = props.book.shelf ? props.book.shelf : 'none';

  let backgroundImage;

  (props.book.imageLinks && props.book.imageLinks.thumbnail) ?
  backgroundImage = props.book.imageLinks.thumbnail :
  backgroundImage = 'http://via.placeholder.com/128x193?text=No%20Cover';

  let authorsString = [];

  if (bookAuthors) authorsString = bookAuthors.join(', ');

  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover"
             style={{ width: 128, height: 192, backgroundImage: `url(${backgroundImage})` }}></div>
        <div className="book-shelf-changer">
          <select onChange={(e) => props.changeShelf(props.book, e.target.value)} value={value}>
            <option value="selection" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{authorsString}</div>
    </div>
  )
};

Book.propTypes = {
  book: PropTypes.object.isRequired,
  changeShelf: PropTypes.func.isRequired
};


export default Book
