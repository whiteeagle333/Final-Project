import React from "react";
import { useHistory } from "react-router-dom";
import BookCover from "./BookCover";

export default function ReadList({ selectedBooks, onBookDelete }) {
  const history = useHistory();

  const handleBookDelete = (isbn) => {
    if (typeof onBookDelete === "function") {
      onBookDelete(isbn); // Call the onBookDelete function passed as a prop
    }
  };

  const handleGoHome = () => {
    history.push("/");
  };

  return (
    <div>
      <h2>Read List</h2>
      <div style={{ overflowX: "scroll" }}>
        <div style={{ display: "flex" }}>
          {selectedBooks.map((book) => (
            <div key={book.isbn} style={{ margin: "10px" }}>
              <BookCover
                isbn={book.isbn}
                title={book.title}
                imageUrl={book.imageUrl}
                onBookSelect={() => {}}
              />
              <button onClick={() => handleBookDelete(book.isbn)}>
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
      <button onClick={handleGoHome}>Take me home</button>
    </div>
  );
}
