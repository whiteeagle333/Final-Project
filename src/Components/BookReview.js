import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function BookReview() {
  const [reviews, setReviews] = useState([]);
  const [bookTitle, setBookTitle] = useState("");
  const [reviewText, setReviewText] = useState("");

  const addReview = (e) => {
    e.preventDefault();

    if (bookTitle.trim() === "" || reviewText.trim() === "") {
      return;
    }

    const newReview = {
      id: Date.now(),
      title: bookTitle,
      review: reviewText,
    };

    setReviews((prevReviews) => [...prevReviews, newReview]);
    setBookTitle("");
    setReviewText("");
  };

  const removeReview = (reviewId) => {
    setReviews((prevReviews) =>
      prevReviews.filter((review) => review.id !== reviewId)
    );
  };

  return (
    <div>
      <h2>Book Reviews</h2>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Book Title</th>
            <th>Review</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review.id}>
              <td>{review.title}</td>
              <td>{review.review}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => removeReview(review.id)}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Form onSubmit={addReview}>
        <Form.Group>
          <Form.Label>Book Title</Form.Label>
          <Form.Control
            type="text"
            value={bookTitle}
            onChange={(e) => setBookTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Review</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
        </Form.Group>
        <Button type="submit">Add</Button>
      </Form>
    </div>
  );
}
