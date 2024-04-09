import React from 'react';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  componentDidMount() {
    axios.get('/books')
      .then(response => {
        this.setState({ books: response.data });
      })
      .catch(error => {
        console.error('Error fetching books', error);
      });
  }

  renderBooks() {
    return this.state.books.map(book => (
      <Carousel.Item key={book.id}>
        <img
          className="d-block w-100"
          src={book.coverImageUrl}
          alt={book.title}
        />
        <Carousel.Caption>
          <h3>{book.title}</h3>
          <p>{book.description}</p>
        </Carousel.Caption>
      </Carousel.Item>
    ));
  }

  render() {
    const { books } = this.state;

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {books.length ? (
          <Carousel>
            {this.renderBooks()}
          </Carousel>
        ) : (
          <h3>No Books Found :(</h3>
        )}
      </>
    );
  }
}

export default BestBooks;
