import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

class BookList extends Component {
  static propTypes = {
    changeShelf: PropTypes.func.isRequired
  };

  render() {
    const {books} = this.props;
    const shelfCategories = [
      { category: 'currentlyReading', title: 'Currently Reading' },
      { category: 'wantToRead', title: 'Want to Read' },
      { category: 'read', title: 'Read' }
    ]

  return (
    <div className="list-books-content">
      { shelfCategories.map((shelf, index) => {
        const shelfBooks = books.filter(book => book.shelf === shelf.category)

        return (
          <div className="bookshelf" key={index}>
            <h2 className="bookshelf-title">{shelf.title}</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {/* books go here */}
                  { shelfBooks.map((book)=> (
                      <li key={book.id}>
                        <Book book={book} changeShelf={this.props.changeShelf} />
                      </li>
                    ))
                  }
                </ol>
              </div>
          </div>
        )
      })}
    </div>
  )}
}

export default BookList