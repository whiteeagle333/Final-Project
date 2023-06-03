import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Footer from "./Footer"; // Import the Footer component

export default function ReadList({ selectedBooks, onBookDelete, limit }) {
  const history = useHistory();
  const [selectedBook, setSelectedBook] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [bookDetails, setBookDetails] = useState("");

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

  const handleGoHome = () => {
    history.push("/");
  };

  const handleBookSelect = (book) => {
    setSelectedBook(book);
    setBookDetails(book.details || "");
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

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

  const limitedBooks = limit ? selectedBooks.slice(0, limit) : selectedBooks;

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
              <Card>
                <Card.Title>{book.title}</Card.Title>
              </Card>
              <Button onClick={() => handleBookDelete(book.isbn)}>
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
          <Button variant="primary" onClick={handleSaveDetails}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Footer /> {<footer></footer>}
    </div>
  );
}
