// import React, { useState, useEffect, useRef } from "react";
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import BookCard from "./BookCard";
// import Footer from "./Footer"; // Import the Footer component

// export default function Home({ onBookSelect }) {
//   const [searchQuery, setSearchQuery] = useState("Dakini");
//   const [searchResults, setSearchResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [page, setPage] = useState(1);
//   const containerRef = useRef(null);

//   useEffect(() => {
//     const savedSearchResults = JSON.parse(
//       localStorage.getItem("searchResults")
//     );
//     if (savedSearchResults) {
//       setSearchResults(savedSearchResults);
//     } else {
//       fetchBooks();
//     }
//   }, []);

//   useEffect(() => {
//     fetchBooks();
//   }, [page]);

//   useEffect(() => {
//     const options = {
//       root: null,
//       rootMargin: "0px",
//       threshold: 0.1,
//     };

//     const handleIntersection = (entries) => {
//       const entry = entries[0];
//       if (entry.isIntersecting && !loading) {
//         setPage((prevPage) => prevPage + 1);
//       }
//     };

//     const observer = new IntersectionObserver(handleIntersection, options);
//     if (containerRef.current) {
//       observer.observe(containerRef.current);
//     }

//     return () => {
//       observer.disconnect();
//     };
//   }, [loading]);

//   const fetchBooks = async () => {
//     try {
//       setLoading(true);
//       const encodedSearchQuery = encodeURIComponent(searchQuery);
//       const apiKey = "AIzaSyD4bDZu4aTKIdYFtJM-OV81C6IeSrrTZgg"; // Replace with your Google Books API key
//       const url = `https://www.googleapis.com/books/v1/volumes?q=${encodedSearchQuery}&startIndex=${
//         (page - 1) * 12
//       }&maxResults=12&key=${apiKey}`;

//       const response = await fetch(url);
//       if (!response.ok) {
//         throw new Error("Fetch failed");
//       }
//       const data = await response.json();
//       const bookItems = data.items;
//       if (bookItems) {
//         const formattedBooks = bookItems.map((item) => {
//           const volumeInfo = item.volumeInfo;
//           const isbn = volumeInfo.industryIdentifiers?.[0]?.identifier || "";
//           return {
//             isbn,
//             title: volumeInfo.title,
//             imageUrl: volumeInfo.imageLinks?.thumbnail,
//           };
//         });

//         const uniqueBooks = formattedBooks.filter((book) => {
//           return !searchResults.some((prevBook) => prevBook.isbn === book.isbn);
//         });

//         setSearchResults((prevBooks) => [...prevBooks, ...uniqueBooks]);
//         localStorage.setItem(
//           "searchResults",
//           JSON.stringify([...searchResults, ...uniqueBooks])
//         );
//       }
//       setLoading(false);
//     } catch (error) {
//       console.error(error);
//       setLoading(false);
//     }
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     setSearchResults([]);
//     setPage(1);
//     fetchBooks();
//   };

//   const handleBookSelect = (book) => {
//     onBookSelect(book);

//     // Add book to the "ReadList" API
//     const url = "https://647a10b3a455e257fa6442e4.mockapi.io/read/ReadList";
//     fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(book),
//     })
//       .then((response) => response.json())
//       .then((data) => console.log("Book added to ReadList:", data))
//       .catch((error) => console.error("Error adding book to ReadList:", error));
//   };

//   return (
//     <Container>
//       <div style={{ overflowX: "scroll" }}>
//         <h2>Search Books</h2>
//         <form onSubmit={handleSearch}>
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             placeholder="Enter a search query"
//           />
//           <button type="submit">Search</button>
//         </form>
//         <Row>
//           {searchResults.map((book, index) => (
//             <Col key={index} xs={6} sm={4} md={3} lg={2} xl={2}>
//               <BookCard book={book} onBookSelect={handleBookSelect} />
//             </Col>
//           ))}
//         </Row>
//         {loading && <p>Loading...</p>}
//         <div ref={containerRef}></div>
//       </div>
//       <Footer /> {<footer></footer>}
//     </Container>
//   );
// }
//------------------------breaking down code below------------------------------------
/*Importing necessary dependencies: 
This code imports React and several other dependencies needed for the component,
 including the Bootstrap components Container, Row, and Col. 
 It also imports the BookCard and Footer components from local files.
*/
import React, { useState, useEffect, useRef } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BookCard from "./BookCard";
import Footer from "./Footer"; // Import the Footer component

/*Defining the functional component:
The component is defined as a function component named Home, which takes an onBookSelect prop as an argument.
*/

export default function Home({ onBookSelect }) {
  //Declaring state variables using the useState hook:The useState hook is used to declare and initialize several state variables:
  const [searchQuery, setSearchQuery] = useState("Dakini"); //searchQuery: stores the current search query, initialized with the value "Dakini".
  const [searchResults, setSearchResults] = useState([]); //searchResults: stores an array of book search results, initially empty.
  const [loading, setLoading] = useState(false); //loading: indicates whether the data is currently being loaded, initially set to false.
  const [page, setPage] = useState(1); //page: represents the current page number of search results, initially set to 1.
  const containerRef = useRef(null); //containerRef: a ref object used to reference the container element in the DOM.

  /*Fetching initial search results or retrieving them from local storage:
  The useEffect hook is used to perform a side effect when the component mounts.
   It checks if there are saved search results in the local storage,
   and if so, it sets the searchResults state variable with the saved results. 
  Otherwise, it calls the fetchBooks function to fetch new search results.
  */
  useEffect(() => {
    const savedSearchResults = JSON.parse(
      localStorage.getItem("searchResults")
    );
    if (savedSearchResults) {
      setSearchResults(savedSearchResults);
    } else {
      fetchBooks();
    }
  }, []);
  //Fetching search results based on the page number i had it set to pages but put it to 1 looks better:
  /*useEffect hook is used to fetch search results whenever the page state variable changes.
   This ensures that the correct page of results is fetched when the user scrolls to the bottom or selects a new page.*/
  useEffect(() => {
    fetchBooks();
  }, [1]);
  /*Setting up an intersection observer to handle infinite scrolling lol , when changed the pages to 1 page belive it stoped it
think in the long haul was after 100 give you errors due to the mockapi can only handle 100 is what i think.

This useEffect hook sets up an intersection observer that triggers a callback (handleIntersection) when the container element (containerRef.current)
 intersects with the viewport. It increments the page state variable to fetch the next page of results.
 The observer is disconnected when the component unmounts.


*/
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const handleIntersection = (entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    const observer = new IntersectionObserver(handleIntersection, options);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [loading]);

  //Fetching books from the Google Books API:
  /*The fetchBooks function is an asynchronous function that performs the API request to fetch books from the Google Books API.
   It uses the searchQuery and page state variables to construct the API URL and fetches the data.
   It then processes the response and updates the searchResults state variable with the new books. */

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const encodedSearchQuery = encodeURIComponent(searchQuery);
      const apiKey = "AIzaSyD4bDZu4aTKIdYFtJM-OV81C6IeSrrTZgg"; // Google Books API key
      const url = `https://www.googleapis.com/books/v1/volumes?q=${encodedSearchQuery}&startIndex=${
        (page - 1) * 12
      }&maxResults=12&key=${apiKey}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Fetch failed");
      }
      const data = await response.json();
      const bookItems = data.items;
      if (bookItems) {
        const formattedBooks = bookItems.map((item) => {
          const volumeInfo = item.volumeInfo;
          const isbn = volumeInfo.industryIdentifiers?.[0]?.identifier || "";
          return {
            isbn,
            title: volumeInfo.title,
            imageUrl: volumeInfo.imageLinks?.thumbnail,
          };
        });

        const uniqueBooks = formattedBooks.filter((book) => {
          return !searchResults.some((prevBook) => prevBook.isbn === book.isbn);
        });

        setSearchResults((prevBooks) => [...prevBooks, ...uniqueBooks]);
        localStorage.setItem(
          "searchResults",
          JSON.stringify([...searchResults, ...uniqueBooks])
        );
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };
  /*Handling the search form submission:
The handleSearch function is called when the user submits the search form.
It prevents the default form submission behavior, resets the searchResults
 and page state variables, and calls fetchBooks to perform a new search.
*/
  const handleSearch = (e) => {
    e.preventDefault();
    setSearchResults([]);
    setPage(1);
    fetchBooks();
  };
  /*  
Handling book selection:
The handleBookSelect function is called when a book card is selected. 
It invokes the onBookSelect prop function, passing the selected book as an argument.
It also sends a POST request to the "ReadList" API to add the book.
*/
  const handleBookSelect = (book) => {
    onBookSelect(book);

    // Add book to the "ReadList" API
    const url = "https://647a10b3a455e257fa6442e4.mockapi.io/read/ReadList";
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(book),
    })
      .then((response) => response.json())
      .then((data) => console.log("Book added to ReadList:", data))
      .catch((error) => console.error("Error adding book to ReadList:", error));
  };
  /* Rendering the component:
The component returns JSX that represents the UI of the home page. It uses the imported Bootstrap components to structure and style the layout. 
It includes a search form, a list of book cards, a loading indicator, and a container element with a ref.
*/
  //after return

  return (
    <Container>
      {/*Rendering the search form and book cards:
Within the JSX, there's a <div> element with a style that enables horizontal scrolling.
 It contains a heading, a search form with input and button elements, 
 a <Row> element to display the book cards, a loading indicator displayed conditionally based on the loading state variable,
 and a <div> element that serves as the container reference for the intersection observer.
*/}
      <div style={{ overflowX: "scroll" }}>
        <h2>Search Books</h2>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter a search query"
          />
          <button type="submit">Search</button>
        </form>
        <Row>
          {searchResults.map((book, index) => (
            <Col key={index} xs={6} sm={4} md={3} lg={2} xl={2}>
              <BookCard book={book} onBookSelect={handleBookSelect} />
            </Col>
          ))}
        </Row>
        {loading && <p>Loading...</p>}
        <div ref={containerRef}></div>
      </div>
      <Footer /> {<footer></footer>}
    </Container>
  );
}
