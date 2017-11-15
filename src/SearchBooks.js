/**
 * Created by diogomatoschaves on 10/11/2017.
 */

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import debounce from 'lodash/debounce';
import * as BooksAPI from './BooksAPI.js';
import PropTypes from 'prop-types';
import Book from './Book.js';


class SearchBooks extends PureComponent {

  constructor(props){
    super(props);
    this.state = {
      query: '',
      searchResults: []
    };
    this.changed = debounce(this.changed, 400)
  }

  static propTypes = {
    books: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired
  };

  changed = (prevState) => {
    if (this.state.query !== prevState.query && this.state.query !== '') {

      BooksAPI.search(this.state.query, 20)
        .then(results => {
          this.checkStatus(results);
        });
    }

    if (this.state.query !== prevState.query && this.state.query === '') {
      this.setState({searchResults: []})
    }
  };
  
  componentDidUpdate(prevProps, prevState) {
    this.changed(prevState);
  }
  
  updateQuery = (event) => {
    // debugger;
    event.persist();
    this.setState({query: event.target.value})

  };

  checkStatus = (searchResults) => {

    const ids = this.props.books.map((book) => book.id);

    let newSearchResults = searchResults;

    if (searchResults instanceof Array) {
      searchResults.forEach((result, index) => {
        let indexBooks = ids.indexOf(result.id);
        if (indexBooks !== -1) {
          newSearchResults[index].shelf = this.props.books[indexBooks].shelf;
        }
      });

    } else {
      newSearchResults = []
    }

    this.setState({
      searchResults: newSearchResults
    })
  };

  render() {

    const { searchResults, query } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            className="close-search"
            to="/">Close
          </Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
              <input
                type="text" 
                value={query}
                onChange={this.updateQuery}
                placeholder="Search by title or author"
              />
          </div>
        </div>
        <div className="search-books-results">
          <div className="bookshelf">
            <div className="bookshelf-books">
              <ol className="books-grid">
                {searchResults && (
                  searchResults.map((book) => (
                    <li key={book.id}>
                      <Book
                        book={book}
                        changeShelf={this.props.changeShelf}
                      />
                    </li>
                  ))
                )}
              </ol>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SearchBooks
