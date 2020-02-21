import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Book from './Book';

class Search extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired
  };

  state = {
    searchResult: '',
    newBooks: []
  };

  updateQuery = event => {
    const searchResult = event.target.value;
    this.setState({ searchResult });

    if (searchResult) {
      BooksAPI.search(searchResult).then(books => {
        books.length > 0 ? this.setState({ newBooks: books }) : this.setState({ newBooks: [] });
      });
    }
    else this.setState({ newBooks: [] });
  };

  render() {
    const { searchResult, newBooks } = this.state;
    const { books, changeShelf } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
        <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" 
            value={ searchResult } onChange={this.updateQuery} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {newBooks.map(book => (
              <Book book={book} books={books} key={book.id} changeShelf={changeShelf} />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search