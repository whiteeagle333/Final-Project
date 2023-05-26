// import React, { useState } from "react";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import Navbar from "react-bootstrap/Navbar";
// import Nav from "react-bootstrap/Nav";
// import Button from "react-bootstrap/Button";
// import Container from "react-bootstrap/Container";
// import Form from "react-bootstrap/Form";
// import FormControl from "react-bootstrap/FormControl";

// import Home from "./Components/Home.js";
// import About from "./Components/About.js";
// import ReadList from "./Components/ReadList.js";

// export default function App() {
//   const [selectedBooks, setSelectedBooks] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchResults, setSearchResults] = useState([]);

//   // Function to handle adding books to the read list
//   const addToReadList = (book) => {
//     setSelectedBooks((prevSelectedBooks) => [...prevSelectedBooks, book]);
//   };

//   // Function to handle searching books
//   const handleSearch = async () => {
//     try {
//       const response = await fetch(
//         `https://api.example.com/books?search=${searchTerm}`
//       );
//       const data = await response.json();
//       setSearchResults(data.results);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleInputChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   return (
//     <Container>
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
//                 <Nav.Link as={Link} to="/">
//                   Home
//                 </Nav.Link>
//                 <Nav.Link as={Link} to="/about">
//                   About
//                 </Nav.Link>
//                 <Nav.Link as={Link} to="/read-list">
//                   Read List
//                 </Nav.Link>
//               </Nav>
//               <Form className="d-flex">
//                 <FormControl
//                   type="search"
//                   placeholder="Search"
//                   className="mr-2"
//                   aria-label="Search"
//                   value={searchTerm}
//                   onChange={handleInputChange}
//                 />
//                 <Button variant="outline-success" onClick={handleSearch}>
//                   Search
//                 </Button>
//               </Form>
//             </Navbar.Collapse>
//           </Navbar.Offcanvas>
//         </Navbar>

//         <Switch>
//           <Route exact path="/">
//             <Home onBookSelect={addToReadList} />
//           </Route>
//           <Route path="/about">
//             <About />
//           </Route>
//           <Route path="/read-list">
//             <ReadList
//               selectedBooks={selectedBooks}
//               onBookDelete={(isbn) =>
//                 setSelectedBooks((prevSelectedBooks) =>
//                   prevSelectedBooks.filter((book) => book.isbn !== isbn)
//                 )
//               }
//             />
//           </Route>
//         </Switch>
//       </Router>
//     </Container>
//   );
// }
//---------------------------------------
// import React, { useState } from "react";
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import Navbar from "react-bootstrap/Navbar";
// import Nav from "react-bootstrap/Nav";
// import Button from "react-bootstrap/Button";
// import Container from "react-bootstrap/Container";
// import Form from "react-bootstrap/Form";
// import FormControl from "react-bootstrap/FormControl";

// import Home from "./Components/Home.js";
// import About from "./Components/About.js";
// import ReadList from "./Components/ReadList.js";

// export default function App() {
//   const [selectedBooks, setSelectedBooks] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [bookImages, setBookImages] = useState([]);

//   // Function to handle adding books to the read list
//   const addToReadList = (book) => {
//     setSelectedBooks((prevSelectedBooks) => [...prevSelectedBooks, book]);
//   };

//   // Function to handle searching books
//   const handleSearch = async () => {
//     try {
//       const response = await fetch(
//         `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
//           searchTerm
//         )}&key=AIzaSyBV-HUBloh982Noki60rONXpdAZGlnk8Lg`
//       );
//       const data = await response.json();
//       setSearchResults(data.items);
//       setBookImages(
//         data.items.map((item) =>
//           item.volumeInfo.imageLinks
//             ? item.volumeInfo.imageLinks.thumbnail
//             : null
//         )
//       );
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleInputChange = (event) => {
//     setSearchTerm(event.target.value);
//   };

//   return (
//     <Container>
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
//                 <Nav.Link as={Link} to="/">
//                   Home
//                 </Nav.Link>
//                 <Nav.Link as={Link} to="/about">
//                   About
//                 </Nav.Link>
//                 <Nav.Link as={Link} to="/read-list">
//                   Read List
//                 </Nav.Link>
//               </Nav>
//               <Form className="d-flex">
//                 <FormControl
//                   type="search"
//                   placeholder="Search"
//                   className="mr-2"
//                   aria-label="Search"
//                   value={searchTerm}
//                   onChange={handleInputChange}
//                 />
//                 <Button variant="outline-success" onClick={handleSearch}>
//                   Search
//                 </Button>
//               </Form>
//             </Navbar.Collapse>
//           </Navbar.Offcanvas>
//         </Navbar>

//         <Switch>
//           <Route exact path="/">
//             <Home
//               onBookSelect={addToReadList}
//               searchResults={searchResults}
//               bookImages={bookImages}
//             />
//           </Route>
//           <Route path="/about">
//             <About />
//           </Route>
//           <Route path="/read-list">
//             <ReadList
//               selectedBooks={selectedBooks}
//               onBookDelete={(isbn) =>
//                 setSelectedBooks((prevSelectedBooks) =>
//                   prevSelectedBooks.filter((book) => book.isbn !== isbn)
//                 )
//               }
//             />
//           </Route>
//         </Switch>
//       </Router>
//     </Container>
//   );
// }
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";

import Home from "./Components/Home.js";
import About from "./Components/About.js";
import ReadList from "./Components/ReadList.js";

export default function App() {
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Function to handle adding books to the read list
  const addToReadList = (book) => {
    setSelectedBooks((prevSelectedBooks) => [...prevSelectedBooks, book]);
  };

  // Function to handle searching books
  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&key=AIzaSyBV-HUBloh982Noki60rONXpdAZGlnk8Lg`
      );
      const data = await response.json();
      setSearchResults(data.items);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

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
              </Nav>
              <Form className="d-flex">
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="mr-2"
                  aria-label="Search"
                  value={searchTerm}
                  onChange={handleInputChange}
                />
                <Button variant="outline-success" onClick={handleSearch}>
                  Search
                </Button>
              </Form>
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
        </Switch>
      </Router>
    </Container>
  );
}
