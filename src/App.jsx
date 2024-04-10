import { useState, useEffect } from 'react'
import axios from 'axios';

import Books from './BestBooks.jsx';
//  when export, make sure you call it "BestBooks"

function App() {

  const [books, setBooks] = useState([]);
  
  useEffect( () => {
     getBooks();
  }, []);

  async function getBooks() {
    try {
      const response = await axios.get('https://can-of-books-backend-qs90.onrender.com/books');
      setBooks(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  async fucntion deleteBook(id) {

  try {
    const response = await axios.delete(`https://can-of-books-backend-qs90.onrender.com/books/${id}`);
    let deleteBooks = response.data;

    let newBooks = books.filter( function(book) {
      return book._id !== deleteBooks._id;
    });
    setBooks(newBooks);

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
    <Books handleAddBook={addBook} handleDelete={deleteBook} books={books} />
    </>
  )
} 


export default App;

// import React from 'react';
// import Header from './Header';
// import Footer from './Footer';
// import BestBooks from './BestBooks';
// import About from './About'; // Import the About component
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// class App extends React.Component {
//   render() {
//     return (
//       <>
//         <Router>
//           <Header />
//           <nav>
//             <Link to="/">Home</Link> | <Link to="/about">About</Link>
//           </nav>
//           <Routes>
//             <Route exact path="/" element={<BestBooks />} />
//             <Route path="/about" element={<About />} />
//           </Routes>
//           <Footer />
//         </Router>
//       </>
//     )
//   }
// }

// export default App;
