// import React, { useState, useEffect } from "react";
// import { useHistory } from "react-router-dom";
// import Card from "react-bootstrap/Card";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
// import Tab from "react-bootstrap/Tab";
// import Nav from "react-bootstrap/Nav";
// import Form from "react-bootstrap/Form";
// import Footer from "./Footer"; // Import the Footer component

// export default function ReadList({ selectedBooks, onBookDelete, limit }) {
//   const history = useHistory();
//   const [selectedBook, setSelectedBook] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [bookDetails, setBookDetails] = useState("");

//   const handleBookDelete = (isbn) => {
//     if (typeof onBookDelete === "function") {
//       const bookToDelete = selectedBooks.find((book) => book.isbn === isbn);
//       if (bookToDelete) {
//         fetch("https://647a10b3a455e257fa6442e4.mockapi.io/read/ReadList", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(bookToDelete),
//         })
//           .then((response) => response.json())
//           .then((data) => {
//             console.log("Book transferred to Read List:", data);
//           })
//           .catch((error) => {
//             console.error("Error transferring book to Read List:", error);
//           });
//       }
//       onBookDelete(isbn);
//     }
//   };

//   const handleGoHome = () => {
//     history.push("/");
//   };

//   const handleBookSelect = (book) => {
//     setSelectedBook(book);
//     setBookDetails(book.details || "");
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//   };

//   const handleSaveDetails = () => {
//     if (selectedBook) {
//       const updatedBook = { ...selectedBook, details: bookDetails };
//       fetch(
//         `https://647a10b3a455e257fa6442e4.mockapi.io/read/ReadList/${selectedBook.isbn}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(updatedBook),
//         }
//       )
//         .then((response) => response.json())
//         .then((data) => {
//           console.log("Book details updated:", data);
//         })
//         .catch((error) => {
//           console.error("Error updating book details:", error);
//         });
//     }
//     setShowModal(false);
//   };

//   useEffect(() => {
//     if (selectedBook) {
//       fetch(
//         `https://647a10b3a455e257fa6442e4.mockapi.io/read/ReadList/${selectedBook.isbn}`
//       )
//         .then((response) => response.json())
//         .then((data) => {
//           if (data.details) {
//             setBookDetails(data.details);
//           }
//         })
//         .catch((error) => {
//           console.error("Error fetching book details:", error);
//         });
//     }
//   }, [selectedBook]);

//   const limitedBooks = limit ? selectedBooks.slice(0, limit) : selectedBooks;

//   return (
//     <div>
//       <h2>To Read List</h2>
//       <div style={{ overflowX: "scroll" }}>
//         <div style={{ display: "flex" }}>
//           {limitedBooks.map((book) => (
//             <div key={book.isbn} style={{ margin: "10px" }}>
//               <Card style={{ width: "10rem" }}>
//                 <Card.Img
//                   variant="top"
//                   src={book.imageUrl}
//                   alt={book.title}
//                   onClick={() => handleBookSelect(book)}
//                 />
//               </Card>
//               <Card style={{ backgroundColor: "black", color: "white" }}>
//                 <Card.Title>{book.title}</Card.Title>
//               </Card>
//               <Button
//                 style={{ backgroundColor: "black", color: "white" }}
//                 onClick={() => handleBookDelete(book.isbn)}
//               >
//                 Remove
//               </Button>
//             </div>
//           ))}
//         </div>
//       </div>
//       <button onClick={handleGoHome}>Take me home</button>
//       <Modal show={showModal} onHide={handleCloseModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Book Details</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Tab.Container id="left-tabs-example" defaultActiveKey="details">
//             <Nav variant="tabs">
//               <Nav.Item>
//                 <Nav.Link eventKey="details">Details</Nav.Link>
//               </Nav.Item>
//             </Nav>
//             <Tab.Content>
//               <Tab.Pane eventKey="details">
//                 <Form.Control
//                   as="textarea"
//                   rows={10}
//                   value={bookDetails}
//                   onChange={(e) => setBookDetails(e.target.value)}
//                 />
//               </Tab.Pane>
//             </Tab.Content>
//           </Tab.Container>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseModal}>
//             Close
//           </Button>
//           <Button variant="dark" onClick={handleSaveDetails}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>
//       <Footer /> {<footer></footer>}
//     </div>
//   );
// }
//----------------code break down-----------------------
//This section imports the necessary dependencies and components from various libraries.//

import React, { useState, useEffect } from "react"; //imports React along with useState and useEffect hooks from the react package
import { useHistory } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Footer from "./Footer";
/*This section defines the ReadList component as a default export. It receives three props:
It also initializes several state variables using the useState hook. selectedBook represents
 the currently selected book, showModal indicates whether the book details modal is visible or not,
  and bookDetails stores the details of the selected book.
*/

export default function ReadList({ selectedBooks, onBookDelete, limit }) {
  const history = useHistory();
  const [selectedBook, setSelectedBook] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [bookDetails, setBookDetails] = useState("");

  /*  
This function handleBookDelete is called when a user clicks on the "Remove" button associated with a book.
 It sends a POST request to a mock API endpoint to transfer the book to a "Read List".
 If the onBookDelete prop is a function, it is called with the isbn of the book to be deleted.
*/

  const handleBookDelete = (isbn) => {
    if (typeof onBookDelete === "function") {
      const bookToDelete = selectedBooks.find((book) => book.isbn === isbn);
      if (bookToDelete) {
        fetch("https://647a10b3a455e257fa6442e4.mockapi.io/read/ReadList", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookToDelete),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Book transferred to Read List:", data);
          })
          .catch((error) => {
            console.error("Error transferring book to Read List:", error);
          });
      }
      onBookDelete(isbn);
    }
  };
  /*This function handleGoHome is called when a user clicks on the "Take me home" button.
 It uses the useHistory hook from react-router-dom to navigate the user to the home page ("/").  */
  const handleGoHome = () => {
    history.push("/");
  };
  /*This function handleBookSelect is called when a user clicks on a book's image. 
 It sets the selectedBook state variable to the clicked book,
 initializes the bookDetails state variable with the book's existing details or an empty string, and sets showModal to true to show */
  const handleBookSelect = (book) => {
    setSelectedBook(book);
    setBookDetails(book.details || "");
    setShowModal(true);
  };
  //This function handleCloseModal is called when the book details modal is closed. It sets the showModal state variable to false to hide the modal.
  const handleCloseModal = () => {
    setShowModal(false);
  };
  /*    
This function handleSaveDetails is called when the user clicks on the "Save Changes" button in the book details modal. 
It updates the details of the selected book by sending a PUT request to the mock API endpoint. 
The updated book object is sent in the request body. After the request is complete, the modal is closed by setting showModal to false.
*/
  const handleSaveDetails = () => {
    if (selectedBook) {
      const updatedBook = { ...selectedBook, details: bookDetails };
      fetch(
        `https://647a10b3a455e257fa6442e4.mockapi.io/read/ReadList/${selectedBook.isbn}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedBook),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("Book details updated:", data);
        })
        .catch((error) => {
          console.error("Error updating book details:", error);
        });
    }
    setShowModal(false);
  };
  /*  
This useEffect hook is used to fetch the details of the selected book when it changes.
 It sends a GET request to the mock API endpoint and retrieves the book details.
 If the fetched data contains details, the bookDetails state variable is updated.
*/
  useEffect(() => {
    if (selectedBook) {
      fetch(
        `https://647a10b3a455e257fa6442e4.mockapi.io/read/ReadList/${selectedBook.isbn}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.details) {
            setBookDetails(data.details);
          }
        })
        .catch((error) => {
          console.error("Error fetching book details:", error);
        });
    }
  }, [selectedBook]);

  /*   
  This line creates a new array called limitedBooks which contains a subset of selectedBooks based on the limit prop. 
  If limit is truthy, it uses Array.slice() to extract the first limit number of books.
   If limit is falsy or not provided, it assigns all selectedBooks to limitedBooks
  */

  const limitedBooks = limit ? selectedBooks.slice(0, limit) : selectedBooks;

  /*This is the JSX markup returned by the component. It renders a list of books using the limitedBooks array. 
Each book is displayed as a Card component with an image, title, and a "Remove" button. 
Clicking on the book's image calls handleBookSelect to show the book details modal.
 Clicking on the "Remove" button calls handleBookDelete to remove the book.
The component also includes a "Take me home" button that calls handleGoHome and a Modal component for displaying and editing book details.
 Finally, it renders a Footer component.*/
  return (
    <div>
      <h2>To Read List</h2>
      <div style={{ overflowX: "scroll" }}>
        <div style={{ display: "flex" }}>
          {limitedBooks.map((book) => (
            <div key={book.isbn} style={{ margin: "10px" }}>
              <Card style={{ width: "10rem" }}>
                <Card.Img
                  variant="top"
                  src={book.imageUrl}
                  alt={book.title}
                  onClick={() => handleBookSelect(book)}
                />
              </Card>
              <Card style={{ backgroundColor: "black", color: "white" }}>
                <Card.Title>{book.title}</Card.Title>
              </Card>
              <Button
                style={{ backgroundColor: "black", color: "white" }}
                onClick={() => handleBookDelete(book.isbn)}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      </div>
      <button onClick={handleGoHome}>Take me home</button>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Book Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tab.Container id="left-tabs-example" defaultActiveKey="details">
            <Nav variant="tabs">
              <Nav.Item>
                <Nav.Link eventKey="details">Details</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="details">
                <Form.Control
                  as="textarea"
                  rows={10}
                  value={bookDetails}
                  onChange={(e) => setBookDetails(e.target.value)}
                />
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="dark" onClick={handleSaveDetails}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Footer /> {<footer></footer>}
    </div>
  );
}
