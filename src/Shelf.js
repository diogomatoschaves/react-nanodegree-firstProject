/**
 * Created by diogomatoschaves on 15/11/2017.
 */

import React from 'react';
import Book from './Book.js'

const Shelf = (props) => {
  
  const books = props.books;
  const changeShelf = props.changeShelf;
  const bookshelfTitle = props.bookshelfTitle;
  
  return (
    <div className="list-books-content">
      <div className="bookshelf">
        <h2 className="bookshelf-title">{bookshelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => (
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
  )
};

export default Shelf

