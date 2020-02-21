import React, { Component } from 'react'
import PropTypes from 'prop-types';

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    changeShelf: PropTypes.func.isRequired
  }

  state = {
    value: this.props.book.shelf ? this.props.book.shelf : ''
  }

  handleChange = event => {
    this.props.changeShelf(this.props.book, event.target.value); this.setState({value: event.target.value})
  }

  render() {
    const bookImg = this.props.book.imageLinks ? this.props.book.imageLinks.thumbnail : '';
    const bookStyle = {
      width: 128, height: 193, backgroundImage: `url('${bookImg}')`
    };    

    return (
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={bookStyle} />

            <div className="book-shelf-changer">
              {/* switching shelves function */}
              <select value={this.state.value} onChange={this.handleChange.bind(this)}>
                  <option value="move" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
              </select>
            </div>
          </div>
            <div className="book-title">{this.props.book && this.props.book.title}</div>
            <div className="book-authors">{this.props.book && this.props.book.authors}</div>
        </div>
    );
  }
}

export default Book