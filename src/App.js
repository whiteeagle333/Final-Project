// import React, { useState, useEffect } from "react";
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link,
//   Redirect,
// } from "react-router-dom";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import Navbar from "react-bootstrap/Navbar";
// import Nav from "react-bootstrap/Nav";
// import Container from "react-bootstrap/Container";
// import Home from "./Components/Home.js";
// import About from "./Components/About.js";
// import ReadList from "./Components/ReadList.js";
// import BookReview from "./Components/BookReview.js";

// export default function App() {
//   const [selectedBooks, setSelectedBooks] = useState([]);
//   const [redirectToReadList, setRedirectToReadList] = useState(false);
//   const [searchResults, setSearchResults] = useState([]);

//   const addToReadList = (book) => {
//     setSelectedBooks((prevSelectedBooks) => [...prevSelectedBooks, book]);
//     console.log("Book added to the read list.");
//     setRedirectToReadList(true);
//   };

//   useEffect(() => {
//     if (redirectToReadList) {
//       setRedirectToReadList(false);
//     }
//   }, [redirectToReadList]);

//   return (
//     <Container style={{ backgroundColor: "grey", color: "white" }}>
//       <Router>
//         <Navbar variant="dark" expand="lg" className="bg-dark">
//           <Navbar.Brand href="#home">Rebel Books</Navbar.Brand>
//           <Navbar.Toggle aria-controls="offcanvas-navbar" />
//           <Navbar.Offcanvas
//             placement="end"
//             id="offcanvas-navbar"
//             aria-labelledby="offcanvas-navbar-label"
//           >
//             <Navbar.Collapse id="basic-navbar-nav">
//               <Nav className="me-auto">
//                 <Nav.Link as={Link} to="/" key="home">
//                   Home
//                 </Nav.Link>
//                 <Nav.Link as={Link} to="/about" key="about">
//                   About
//                 </Nav.Link>
//                 <Nav.Link as={Link} to="/read-list" key="read-list">
//                   Read List
//                 </Nav.Link>
//                 <Nav.Link as={Link} to="/book-review" key="book-review">
//                   Book Review
//                 </Nav.Link>
//               </Nav>
//             </Navbar.Collapse>
//           </Navbar.Offcanvas>
//         </Navbar>
//         <Switch>
//           <Route exact path="/">
//             <Home
//               onBookSelect={addToReadList}
//               searchResults={searchResults}
//               setSearchResults={setSearchResults}
//               key="home-route"
//             />
//           </Route>
//           <Route path="/about">
//             <About key="about-route" />
//           </Route>
//           <Route path="/read-list">
//             <ReadList
//               selectedBooks={selectedBooks}
//               onBookDelete={(isbn) =>
//                 setSelectedBooks((prevSelectedBooks) =>
//                   prevSelectedBooks.filter((book) => book.isbn !== isbn)
//                 )
//               }
//               key="read-list-route"
//             />
//           </Route>
//           <Route path="/book-review">
//             <BookReview key="book-review-route" />
//           </Route>
//         </Switch>
//         {redirectToReadList && <Redirect to="/read-list" key="redirect" />}
//       </Router>
//     </Container>
//   );
// }
//---------------code break down below ---------------------------------------------------------------------------------
/*Import statements: React is imported from the "react" library. It is used to define and create React components.
useState and useEffect are imported from the "react" library. They are React hooks used for managing state and performing side effects respectively.
*/

import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router, //BrowserRouter, Switch, Route, Link, and Redirect are imported from the "react-router-dom" library.
  Switch,
  Route,
  Link,
  Redirect, //These components are used for setting up client-side routing in the application.
} from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"; //import statement includes the Bootstrap CSS styles.
import Navbar from "react-bootstrap/Navbar"; //They are Bootstrap components used for building the navigation bar.
import Nav from "react-bootstrap/Nav"; //They are Bootstrap components used for building the navigation bar.
import Container from "react-bootstrap/Container"; //They are Bootstrap components used for building the navigation bar.
import Home from "./Components/Home.js"; //custom components imported from their respective files.
import About from "./Components/About.js"; //custom components imported from their respective files.
import ReadList from "./Components/ReadList.js"; //custom components imported from their respective files.
import BookReview from "./Components/BookReview.js"; //custom components imported from their respective files.
/*
Function component:
The App function component is the entry point of the application.
State variables are declared using the useState hook:
selectedBooks represents the list of selected books in the read list.
redirectToReadList is a boolean variable used to trigger a redirect to the read list.
searchResults represents the results of a search operation.
*/
export default function App() {
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [redirectToReadList, setRedirectToReadList] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  /*  The addToReadList function is called when a book is added to the read list. 
It updates the selectedBooks state by appending the new book to the existing list, 
logs a message to the console, and sets redirectToReadList to true.
*/

  const addToReadList = (book) => {
    setSelectedBooks((prevSelectedBooks) => [...prevSelectedBooks, book]);
    console.log("Book added to the read list.");
    setRedirectToReadList(true);
  };
  /*The useEffect hook is used to reset redirectToReadList to false whenever it changes.*/
  useEffect(() => {
    if (redirectToReadList) {
      setRedirectToReadList(false);
    }
  }, [redirectToReadList]);

  //  The return statement renders the components and routes within a <Container> component.

  return (
    <Container style={{ backgroundColor: "grey", color: "white" }}>
      {/*The <Router> component sets up the routing system for the application.*/}
      <Router>
        {/*The <Navbar> component from Bootstrap is used to create a navigation bar.*/}
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
                <Nav.Link as={Link} to="/" key="home">
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to="/about" key="about">
                  About
                </Nav.Link>
                <Nav.Link as={Link} to="/read-list" key="read-list">
                  Read List
                </Nav.Link>
                <Nav.Link as={Link} to="/book-review" key="book-review">
                  Book Review
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar.Offcanvas>
        </Navbar>
        <Switch>
          {" "}
          {/*The <Switch> component is used to render only the first*/}
          <Route exact path="/">
            {" "}
            {/*<Route> components that define the routes for different paths:*/}
            <Home
              onBookSelect={addToReadList}
              searchResults={searchResults}
              setSearchResults={setSearchResults}
              key="home-route"
            />
          </Route>
          <Route path="/about">
            <About key="about-route" />
          </Route>
          <Route path="/read-list">
            <ReadList
              selectedBooks={selectedBooks}
              onBookDelete={(isbn) =>
                setSelectedBooks((prevSelectedBooks) =>
                  prevSelectedBooks.filter((book) => book.isbn !== isbn)
                )
              }
              key="read-list-route"
            />
          </Route>
          <Route path="/book-review">
            <BookReview key="book-review-route" />
          </Route>
        </Switch>
        {redirectToReadList && <Redirect to="/read-list" key="redirect" />}{" "}
        {/* If redirectToReadList is true, the user will be redirected to the "/read-list" path.*/}
      </Router>
    </Container>
  );
}
