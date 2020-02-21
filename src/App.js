import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import { Route, BrowserRouter, Link } from "react-router-dom";
import BookList from "./BookList";
import Search from "./Search";

class BooksApp extends React.Component {
  state = {
    books: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
     this.setState({ books });
    });
  };

  changeShelf = (movedBook, shelf) => {
    BooksAPI.update(movedBook, shelf).then(()=> {
      movedBook.shelf = shelf;
      this.setState(state => ({
        books: state.books
        .filter(book => book.id !== movedBook.id).concat(movedBook)
      }));
    });
  };

  render() {
    const {books} = this.state;

    return (
      <div className="app">
          <BrowserRouter>
            <Route path="/search" 
              render = {() => (
                <Search books={this.state.books} changeShelf={this.changeShelf} />
              )} 
            />
            <Route exact path="/" 
              render = {() => (
                <div className="list-books">
                  <div className="list-books-title">
                    <h1>MyReads</h1>
                  </div>
                    <BookList books={books} changeShelf={this.changeShelf} />
                  <div className="open-search">
                    <Link to="/search">Search</Link>
                  </div>
                </div>
              )}
            />
          </BrowserRouter>
      </div>
    );
  }
}

export default BooksApp
