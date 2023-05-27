import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";

export default function ReadList({ selectedBooks, onBookDelete }) {
  const history = useHistory();
  const [selectedBook, setSelectedBook] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [bookDetails, setBookDetails] = useState("");

  const handleBookDelete = (isbn) => {
    if (typeof onBookDelete === "function") {
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
      // Update the book in your data or send the updated book object to a server
      // Make a PUT request to the API to update the book details
      fetch(
        `https://645f13aa9d35038e2d1caaa0.mockapi.io/books/user/${selectedBook.isbn}`,
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
          // Handle success
          console.log("Book details updated:", data);
        })
        .catch((error) => {
          // Handle error
          console.error("Error updating book details:", error);
        });
    }
    setShowModal(false);
  };

  useEffect(() => {
    if (selectedBook) {
      // Fetch book details from the API
      fetch(
        `https://645f13aa9d35038e2d1caaa0.mockapi.io/books/user/${selectedBook.isbn}`
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

  return (
    <div>
      <h2>To Read List</h2>
      <div style={{ overflowX: "scroll" }}>
        <div style={{ display: "flex" }}>
          {selectedBooks.map((book) => (
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
    </div>
  );
}
