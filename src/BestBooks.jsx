import { useState } from 'react'

function Books(props) {

  const [bookData, setBookData] = useState({});

  // async function deleteTheBook(event) {
  //   let id = event.target.id;
  //   props.handleDelete(id);
  // }

  function handleChange(event) {
    let value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setBookData({
      ...bookData, [event.target.name]: value
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
      <form onSubmit={handleSUbmit}>
        <div><input name="title" type="text" placeholder="Title" onChange={handleChange} /></div>
        <div><input name="author" type="text" placeholder="Author" onChange={handleChange} /></div>
        <div><input name="available" type="checkbox" onChange={handleChange} /><span>Available</span></div>
      </form>
      <section>
        {props.books.map(book =>
          <div key={book_id}>
            <h2>{book.title}</h2>
            <p>Title: {book.title}</p>
            <p>Author: {book.author}</p>
            <p>Is Available: {book.isAvailabe.toString()}</p>
          </div>
        )
        }
      </section>
    </>
  );




}

export default BestBooks;




// import React from 'react';
// import axios from 'axios';
// import { Carousel } from 'react-bootstrap';

// class BestBooks extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       books: []
//     }
//   }

//   componentDidMount() {
//     axios.get('https://can-of-books-backend-qs90.onrender.com/books')
//       .then(response => {
//         this.setState({ books: response.data });
//       })
//       .catch(error => {
//         console.error('Error fetching books', error);
//       });
//   }

//   renderBooks() {
//     return this.state.books.map(book => (
//       <Carousel.Item key={book.id}>
//         <img
//           className="d-block w-100"
//           src={book.coverImageUrl}
//           alt={book.title}
//         />
//         <Carousel.Caption>
//           <h3>{book.title}</h3>
//           <p>{book.description}</p>
//         </Carousel.Caption>
//       </Carousel.Item>
//     ));
//   }

//   render() {
//     const { books } = this.state;

//     return (
//       <>
//         <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

//         {books.length ? (
//           <Carousel>
//             {this.renderBooks()}
//           </Carousel>
//         ) : (
//           <h3>No Books Found :(</h3>
//         )}
//       </>
//     );
//   }
// }

// export default BestBooks;
