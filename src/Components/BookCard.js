import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function BookCard({ book, onBookSelect }) {
  const { title, imageUrl } = book;

  return (
    <Card style={{ width: "100%" }}>
      <Card.Img variant="top" src={imageUrl} alt={title} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Button onClick={() => onBookSelect(book)}>Add to Read List</Button>
      </Card.Body>
    </Card>
  );
}
