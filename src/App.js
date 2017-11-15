import React from 'react';
import './App.css';
import ListBooks from './ListBooks.js';
import * as BooksAPI from './BooksAPI.js';
import { Switch, Route } from 'react-router-dom';
import SearchBooks from './SearchBooks.js';
import NoMatch from './NoMatch.js'


class BooksApp extends React.Component {
  state = {
    books: []
  };

  componentDidMount () {
    BooksAPI.getAll().then((books) => {this.setState({books: books})});
  }

  changeShelf = (book, shelf) => {
    // debugger;
    BooksAPI.update(book, shelf).then(res => {
      
    });

    let books = this.state.books;
    const booksId = books.map((prevBook) => prevBook.id);
      if (booksId.includes(book.id)) {
        books[booksId.indexOf(book.id)].shelf = shelf;
      } else {
        book.shelf = shelf;
        books.push(book)
      }

    this.setState({ books })

  };

  render() {
    return (
      <div className="app">
        <Switch>
          <Route path="/search" render={() => (
            <SearchBooks
              books={this.state.books}
              changeShelf={this.changeShelf}
            />
          )}/>
          <Route exact path="/" render={() => (
            <ListBooks
              books={this.state.books}
              changeShelf={this.changeShelf}
            />
          )}/>
          <Route component={NoMatch}/>
        </Switch>
      </div>
    )
  }
}

export default BooksApp
