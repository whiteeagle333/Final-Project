import React, { useState, useEffect, useRef } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BookCard from "./BookCard";

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

  const addBookToMockAPI = async (bookData) => {
    try {
      const url = "https://645f13aa9d35038e2d1caaa0.mockapi.io/BOOKS/user";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookData),
      });

      if (!response.ok) {
        throw new Error("Failed to add book to MockAPI");
      }

      const data = await response.json();
      console.log("Book added to MockAPI:", data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const encodedSearchQuery = encodeURIComponent(searchQuery);
      const apiKey = "AIzaSyD4bDZu4aTKIdYFtJM-OV81C6IeSrrTZgg";
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

        for (const book of formattedBooks) {
          await addBookToMockAPI(book);
        }

        setSearchResults((prevBooks) => [...prevBooks, ...formattedBooks]);
        localStorage.setItem(
          "searchResults",
          JSON.stringify([...searchResults, ...formattedBooks])
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
