import { useState } from 'react';
import './CustomCarousel.css'; // Import your custom CSS file

function BestBooks(props) {

  const [bookData, setBookData] = useState({});


  async function deleteTheBook(event) {
    let id = event.target.id;
    props.handleDelete(id);
  }

  function handleChange(event) {
    let value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setBookData({
      ...bookData,
      [event.target.name]: value
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(bookData)
    props.handleAddBook(bookData);
  }

  return (
    <>
      <h2>Books</h2>
      <form onSubmit={handleSubmit}>
        <div><input name="title" type="text" placeholder="Enter Title" onChange={handleChange} /></div>
        <div><input name="description" type="text" placeholder="Description" onChange={handleChange} /></div>
        <div><input name="status" type="text" placeholder="Status" onChange={handleChange} /></div>
            <button type="submit">Add Book</button>
      </form>
      <section>
          {props.books.map(bookObj => 
              <div key={bookObj._id}>
                  <h2>{bookObj.title}</h2>
                  <p>Description: {bookObj.description}</p>
                  <p>Status: {bookObj.status}</p>
                  <button id={bookObj._id} onClick={deleteTheBook}>Delete Book</button>
              </div>
          )
          }
      </section>
    </>
  );

}

export default BestBooks;