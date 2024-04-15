import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Carousel, Button } from 'react-bootstrap';
import bookCover from './stack-of-books.png';
import BookFormModal from './BookFormModal';

const API = import.meta.env.VITE_API;

function App() {
    const [books, setBooks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingBook, setEditingBook] = useState(null);

    const handleShowModal = () => {
        setEditingBook(null); // No book to edit, so set to null
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        async function fetchBooks() {
            try {
                const response = await axios.get(`${API}/books`);
                setBooks(response.data);
            } catch (error) {
                console.error('Failed to fetch books:', error);
            }
        }
        fetchBooks();
    }, []);

    async function deleteBooks(id) {
        try {
            await axios.delete(`${API}/books/${id}`);
            setBooks(books.filter(book => book._id !== id));
        } catch (error) {
            console.error('Failed to delete book:', error);
        }
    }

    async function handleBookSubmit(book) {
        if (editingBook) {
            // Editing existing book
            try {
                const response = await axios.put(`${API}/books/${book._id}`, book);
                setBooks(books.map(b => b._id === book._id ? { ...b, ...response.data } : b));
            } catch (error) {
                console.error('Failed to update book:', error);
            }
        } else {
            // Adding new book
            try {
                const response = await axios.post(`${API}/books`, book);
                setBooks([...books, response.data]);
            } catch (error) {
                console.error('Failed to add book:', error);
            }
        }
        handleCloseModal();
    }

    const handleEditModal = (book) => {
        setEditingBook(book); // Set the book to be edited
        setShowModal(true);
    };

    return (
        <>
            <Button variant="primary" onClick={handleShowModal}>Add Book</Button>
            <BookFormModal 
                show={showModal} 
                handleClose={handleCloseModal} 
                handleSubmit={handleBookSubmit} 
                editingBook={editingBook} 
            />
            <Carousel>
                {books.map(book => (
                    <Carousel.Item key={book._id}>
                        <img
                            className="d-block w-100"
                            src={bookCover}
                            alt={book.title}
                            style={{ height: "500px", width: "250px" }}
                        />
                        <Carousel.Caption style={{ color: "black" }}>
                            <h3>{book.title}</h3>
                            <p>{book.description}</p>
                            <Button variant="secondary" onClick={() => handleEditModal(book)}>Edit</Button>
                            <Button variant="danger" onClick={() => deleteBooks(book._id)}>Delete</Button>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
        </>
    );
}

export default App;