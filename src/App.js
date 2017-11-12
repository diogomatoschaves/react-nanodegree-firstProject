import React from 'react';
import './App.css';
import ListBooks from './ListBooks.js';
import * as BooksAPI from './BooksAPI.js';
import { Route } from 'react-router-dom';
import SearchBooks from './SearchBooks.js';


class BooksApp extends React.Component {
  state = {
  /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    searchResults: []
  };

  componentDidMount () {
    BooksAPI.getAll().then((books) => {this.setState({books: books})});
  }

  changeShelf = (book, shelf) => {
    // debugger;
    BooksAPI.update(book, shelf).then(res => {
      console.log(res);
      BooksAPI.getAll().then((books) => {
        this.setState({books: books})
      })
    });
  };

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <SearchBooks
            books={this.state.books}
          />
        )}/>          
        <Route exact path="/" render={() => (
          <ListBooks
            books={this.state.books}
            changeShelf={this.changeShelf}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
