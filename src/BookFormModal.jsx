import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

function BookFormModal({ show, handleClose, handleSubmit }) {
    const [book, setBook] = React.useState({ title: '', description: '' });
  
    const onChange = (e) => {
      setBook({ ...book, [e.target.name]: e.target.value });
    };
  
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a New Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(book);
          }}>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" name="title" value={book.title} onChange={onChange} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} name="description" value={book.description} onChange={onChange} required />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
  
  export default BookFormModal;