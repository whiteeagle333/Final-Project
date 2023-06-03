import React, { useState, useEffect, useRef } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BookCard from "./BookCard";
import Footer from "./Footer"; // Import the Footer component

export default function Home({ onBookSelect }) {
  const [searchQuery, setSearchQuery] = useState("Dakini");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const containerRef = useRef(null);

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

  useEffect(() => {
    fetchBooks();
  }, [page]);

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

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const encodedSearchQuery = encodeURIComponent(searchQuery);
      const apiKey = "AIzaSyD4bDZu4aTKIdYFtJM-OV81C6IeSrrTZgg"; // Replace with your Google Books API key
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

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchResults([]);
    setPage(1);
    fetchBooks();
  };

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

  return (
    <Container>
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
