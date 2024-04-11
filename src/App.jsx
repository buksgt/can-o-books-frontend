import { useState, useEffect } from 'react';
import axios from 'axios';
import { Carousel, Button } from 'react-bootstrap';
import bookCover from './stack-of-books.png';
import BookFormModal from './BookFormModal';

function App() {
const [books, setBooks] = useState([]);
const [showModal, setShowModal] = useState(false);

const handleShowModal = () => setShowModal(true);
const handleCloseModal = () => setShowModal(false);


useEffect( () => {
  getBooks();
}, []); 

    
async function getBooks (){ 
  try {
    const response = await axios.get('https://can-of-books-backend-qs90.onrender.com/books');
  setBooks(response.data);
  } catch (error) {
    console.error(error);
  }
}      

async function deleteBooks(id) {
  try {
    const response = await axios.delete(`https://can-of-books-backend-qs90.onrender.com/books/${id}`);
  let deletedBook = response.data;

  let updatedBooks = books.filter( function(book) {
    return book._id !== deletedBook._id;
  });
  setBooks(updatedBooks);

  } catch (error) {
    console.error(error);
  }
}

async function addBook(book) {
  try {
    let response = await axios.post('https://can-of-books-backend-qs90.onrender.com/books', book);
    let newBook = response.data;
    setBooks([...books, newBook]);

  } catch(error) {
    console.error(error);
  }
}

return (
  <>
    <Button variant="primary" onClick={handleShowModal}>Add Book</Button> {/* Add Book Button */}
    <BookFormModal show={showModal} handleClose={handleCloseModal} handleSubmit={addBook} /> {/* BookFormModal Component */}
    <Carousel>
      {books.map(book => (
        <Carousel.Item key={book.id}>
          <img
            className="d-block w-100"
            src={bookCover}
            alt={book.title}
            style={{ height: "500px", width: "250px" }}
          />
          <Carousel.Caption style={{ color: "black" }}>
            <h3>{book.title}</h3>
            <p>{book.description}</p>
            <Button variant="danger" onClick={() => deleteBooks(book.id)}>Delete</Button> {/* Delete Book Button */}
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  </>
);
}

export default App;