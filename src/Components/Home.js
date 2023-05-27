import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BookCard from "./BookCard";

export default function Home({ onBookSelect }) {
  // Rest of your code...

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const containerRef = useRef(null);
  const history = useHistory();

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
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&startIndex=${
          (page - 1) * 12
        }&maxResults=12`
      );
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
        setSearchResults((prevBooks) => [...prevBooks, ...formattedBooks]);
        localStorage.setItem(
          "searchResults",
          JSON.stringify([...searchResults, ...formattedBooks])
        );
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
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
    // Remove the line below if you don't want to redirect to the "/read-list" page
    history.push("/read-list");
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
    </Container>
  );
}
