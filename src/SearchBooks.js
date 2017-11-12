/**
 * Created by diogomatoschaves on 10/11/2017.
 */

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI.js';


class SearchBooks extends Component {
  
  state = {
    query: '',
    searchResults: []
  };
  
  componentDidUpdate(prevProps, prevState) {
    if (this.state.query !== prevState.query && this.state.query !== '') {
      BooksAPI.search(this.state.query, 20).then(results => {
        this.setState({searchResults: results});
        console.log(this.state.searchResults);
        console.log(results)
      });
    }
  }
  
  updateQuery = (event) => {
    this.setState({query: event.target.value})
  };

  render() {
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
              value={this.state.query}
              onChange={this.updateQuery}
              placeholder="Search by title or author"
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid"></ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks