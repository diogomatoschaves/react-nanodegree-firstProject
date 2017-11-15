/**
 * Created by diogomatoschaves on 10/11/2017.
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {

  /* Regarding comment in review suggesting I should use a stateless functional component:

  I can't use a functional component in this case, as I'm storing the value of the select dropdown option
  as a state variable.

   */

  static propTypes = {
    book: PropTypes.object.isRequired,
    changeShelf: PropTypes.func.isRequired
  };

  state = {
    value: this.props.book.shelf ? this.props.book.shelf : 'none'
  };

  updateState = (event) => {
    const { value } = event.target;
    this.setState({ value });
    this.props.changeShelf(this.props.book, value)
  };

  render() {

    const { authors: bookAuthors, title } = this.props.book;

    let backgroundImage;

    (this.props.book.imageLinks && this.props.book.imageLinks.thumbnail) ?
    backgroundImage = this.props.book.imageLinks.thumbnail :
    backgroundImage = 'http://via.placeholder.com/128x193?text=No%20Cover';

    let authorsString = [];

    if (bookAuthors) authorsString = bookAuthors.join(', ');

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover"
               style={{ width: 128, height: 192, backgroundImage: `url(${backgroundImage})` }}></div>
          <div className="book-shelf-changer">
            <select onChange={this.updateState} value={this.state.value}>
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
  }
}

export default Book
