import React, { useState, useEffect } from "react"; // Import the Footer components

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Footer from "./Footer"; // Import the Footer components

const API_ENDPOINT =
  "https://6478e874362560649a2ea098.mockapi.io/book/bookreviews";

export default function BookReview() {
  const [reviews, setReviews] = useState([]);
  const [bookTitle, setBookTitle] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [selectedReviewId, setSelectedReviewId] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch(API_ENDPOINT);
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.log("Error fetching book reviews:", error);
      // Display an error message to the user or handle the error appropriately
    }
  };

  const addReview = async (e) => {
    e.preventDefault();

    if (bookTitle.trim() === "" || reviewText.trim() === "") {
      return;
    }

    const newReview = {
      title: bookTitle,
      review: reviewText,
    };

    if (selectedReviewId) {
      try {
        await fetch(`${API_ENDPOINT}/${selectedReviewId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newReview),
        });

        setReviews((prevReviews) =>
          prevReviews.map((review) => {
            if (review.id === selectedReviewId) {
              return { ...review, ...newReview };
            }
            return review;
          })
        );

        setBookTitle("");
        setReviewText("");
        setSelectedReviewId(null);
        setIsUpdating(false);
      } catch (error) {
        console.log("Error updating book review:", error);
        // Display an error message to the user or handle the error appropriately
      }
    } else {
      try {
        const response = await fetch(API_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newReview),
        });

        const data = await response.json();
        setReviews((prevReviews) => [...prevReviews, data]);

        setBookTitle("");
        setReviewText("");
      } catch (error) {
        console.log("Error adding book review:", error);
        // Display an error message to the user or handle the error appropriately
      }
    }
  };

  const deleteReview = async (reviewId) => {
    console.log(reviewId); // Add this line to log the reviewId

    try {
      await fetch(`${API_ENDPOINT}/${reviewId}`, {
        method: "DELETE",
      });

      setReviews((prevReviews) =>
        prevReviews.filter((review) => review.id !== reviewId)
      );
    } catch (error) {
      console.log("Error removing book review:", error);
      // Display an error message to the user or handle the error appropriately
    }
  };

  const editReview = (reviewId) => {
    const selectedReview = reviews.find((review) => review.id === reviewId);
    if (selectedReview) {
      setBookTitle(selectedReview.title);
      setReviewText(selectedReview.review);
      setSelectedReviewId(selectedReview.id);
      setIsUpdating(true);
    }
    window.scrollTo(0, 0);
  };

  const cancelUpdate = () => {
    setBookTitle("");
    setReviewText("");
    setSelectedReviewId(null);
    setIsUpdating(false);
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
          {reviews.map((review, index) => (
            <tr key={index}>
              <td>{review.title}</td>
              <td>{review.review}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => deleteReview(review.id)} // Pass the review.id value to deleteReview
                >
                  Delete
                </Button>

                {isUpdating && selectedReviewId === review.id ? (
                  <div>
                    <Button variant="secondary" onClick={cancelUpdate}>
                      Cancel
                    </Button>
                    <Button variant="success" onClick={addReview}>
                      Update
                    </Button>
                  </div>
                ) : (
                  <Button variant="info" onClick={() => editReview(review.id)}>
                    Edit
                  </Button>
                )}
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
        {!isUpdating && (
          <Button variant="primary" type="submit">
            Add
          </Button>
        )}
      </Form>
      <Footer /> {<footer></footer>}
    </div>
  );
}
