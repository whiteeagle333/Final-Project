import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

import Home from "./Components/Home.js";
import About from "./Components/About.js";
import ReadList from "./Components/ReadList.js";
import BookReview from "./Components/BookReview.js";

export default function App() {
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [redirectToReadList, setRedirectToReadList] = useState(false);

  const addToReadList = (book) => {
    setSelectedBooks((prevSelectedBooks) => [...prevSelectedBooks, book]);
    console.log("Book added to the read list.");
    setRedirectToReadList(true);
  };

  useEffect(() => {
    if (redirectToReadList) {
      setRedirectToReadList(false);
    }
  }, [redirectToReadList]);

  return (
    <Container>
      <Router>
        <Navbar variant="dark" expand="lg" className="bg-dark">
          <Navbar.Brand href="#home">Rebel Books</Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvas-navbar" />
          <Navbar.Offcanvas
            placement="end"
            id="offcanvas-navbar"
            aria-labelledby="offcanvas-navbar-label"
          >
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/about">
                  About
                </Nav.Link>
                <Nav.Link as={Link} to="/read-list">
                  Read List
                </Nav.Link>
                <Nav.Link as={Link} to="/book-review">
                  Book Review
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar.Offcanvas>
        </Navbar>
        <Switch>
          <Route exact path="/">
            <Home onBookSelect={addToReadList} searchResults={searchResults} />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/read-list">
            <ReadList
              selectedBooks={selectedBooks}
              onBookDelete={(isbn) =>
                setSelectedBooks((prevSelectedBooks) =>
                  prevSelectedBooks.filter((book) => book.isbn !== isbn)
                )
              }
            />
          </Route>
          <Route path="/book-review">
            <BookReview />
          </Route>
        </Switch>
        {redirectToReadList && <Redirect to="/read-list" />}
      </Router>
    </Container>
  );
}
