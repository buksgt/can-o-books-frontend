import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function BookFormModal({ show, handleClose, handleSubmit, editingBook }) {
    const [book, setBook] = useState({ title: '', description: '' });

    // Effect to set book details if editing
    useEffect(() => {
        if (editingBook) {
            setBook(editingBook);
        } else {
            setBook({ title: '', description: '' }); // Reset form when not editing
        }
    }, [editingBook]);

    const onChange = (e) => {
        setBook({ ...book, [e.target.name]: e.target.value });
    };

    const submitForm = (e) => {
        e.preventDefault();
        handleSubmit(book);
        handleClose();  // Optionally close modal on submit
    };

    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editingBook ? 'Edit Book' : 'Add a New Book'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitForm}>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" value={book.title} onChange={onChange} required id="title" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} name="description" value={book.description} onChange={onChange} required />
            </Form.Group>
            <Button variant="primary" type="submit">
              {editingBook ? 'Update' : 'Submit'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
  
export default BookFormModal;
