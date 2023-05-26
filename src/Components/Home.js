import React, { useState, useEffect, useRef } from "react";
import BookCover from "./BookCover.js";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";

export default function Home({ onBookSelect }) {
  const [booksRow1, setBooksRow1] = useState([]);
  const [booksRow2, setBooksRow2] = useState([]);
  const [pageRow1, setPageRow1] = useState(1);
  const [pageRow2, setPageRow2] = useState(1);
  const [loadingRow1, setLoadingRow1] = useState(false);
  const [loadingRow2, setLoadingRow2] = useState(false);
  const containerRefRow1 = useRef(null);
  const containerRefRow2 = useRef(null);
  const history = useHistory();

  useEffect(() => {
    fetchBooksRow1();
    fetchBooksRow2();
  }, []);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const handleIntersectionRow1 = (entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && !loadingRow1) {
        setPageRow1((prevPage) => prevPage + 1);
      }
    };

    const handleIntersectionRow2 = (entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && !loadingRow2) {
        setPageRow2((prevPage) => prevPage + 1);
      }
    };

    const observerRow1 = new IntersectionObserver(
      handleIntersectionRow1,
      options
    );
    if (containerRefRow1.current) {
      observerRow1.observe(containerRefRow1.current);
    }

    const observerRow2 = new IntersectionObserver(
      handleIntersectionRow2,
      options
    );
    if (containerRefRow2.current) {
      observerRow2.observe(containerRefRow2.current);
    }

    return () => {
      observerRow1.disconnect();
      observerRow2.disconnect();
    };
  }, [loadingRow1, loadingRow2]);

  // Fetch book data for the first row from the Google Books API (Banned and Challenged Books)
  const fetchBooksRow1 = async () => {
    try {
      setLoadingRow1(true);
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=banned+challenged+in+schools&startIndex=${
          (pageRow1 - 1) * 12
        }&maxResults=12`
      );
      const data = await response.json();
      const bookItems = data.items;
      const formattedBooks = bookItems.map((item) => {
        const volumeInfo = item.volumeInfo;
        const isbn = volumeInfo.industryIdentifiers?.[0]?.identifier || "";
        return {
          isbn,
          title: volumeInfo.title,
          imageUrl: volumeInfo.imageLinks?.thumbnail,
        };
      });
      setBooksRow1((prevBooks) => [...prevBooks, ...formattedBooks]);
      setLoadingRow1(false);
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch book data for the second row from the Google Books API (Buddhist Books)
  const fetchBooksRow2 = async () => {
    try {
      setLoadingRow2(true);
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=buddhism&startIndex=${
          (pageRow2 - 1) * 12
        }&maxResults=12`
      );
      const data = await response.json();
      const bookItems = data.items;
      const formattedBooks = bookItems.map((item) => {
        const volumeInfo = item.volumeInfo;
        const isbn = volumeInfo.industryIdentifiers?.[0]?.identifier || "";
        return {
          isbn,
          title: volumeInfo.title,
          imageUrl: volumeInfo.imageLinks?.thumbnail,
        };
      });
      setBooksRow2((prevBooks) => [...prevBooks, ...formattedBooks]);
      setLoadingRow2(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBookSelect = (book) => {
    onBookSelect(book);
    // Remove the line below if you don't want to redirect to the "/read-list" page
    history.push("/read-list");
  };

  return (
    <Container>
      <div style={{ overflowX: "scroll" }}>
        <h2>Banned and Challenged Books</h2>
        <Row className="flex-nowrap">
          {booksRow1.map((book, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3}>
              <div
                ref={index === booksRow1.length - 1 ? containerRefRow1 : null}
              >
                <BookCover
                  isbn={book.isbn}
                  title={book.title}
                  imageUrl={book.imageUrl}
                  onBookSelect={() => handleBookSelect(book)}
                />
                <Button onClick={() => handleBookSelect(book)}>
                  Add to Read List
                </Button>
              </div>
            </Col>
          ))}
        </Row>
        <h2>Buddhist Books</h2>
        <Row className="flex-nowrap">
          {booksRow2.map((book, index) => (
            <Col key={index} xs={12} sm={6} md={4} lg={3}>
              <div
                ref={index === booksRow2.length - 1 ? containerRefRow2 : null}
              >
                <BookCover
                  isbn={book.isbn}
                  title={book.title}
                  imageUrl={book.imageUrl}
                  onBookSelect={() => handleBookSelect(book)}
                />
                <Button onClick={() => handleBookSelect(book)}>
                  Add to Read List
                </Button>
              </div>
            </Col>
          ))}
        </Row>
      </div>
      {(loadingRow1 || loadingRow2) && <div>Loading more books...</div>}
    </Container>
  );
}
