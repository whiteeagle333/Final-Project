// import React, { useState, useEffect } from "react"; // Import the Footer components

// import Table from "react-bootstrap/Table";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import Footer from "./Footer"; // Import the Footer components

// const API_ENDPOINT =
//   "https://6478e874362560649a2ea098.mockapi.io/book/bookreviews";

// export default function BookReview() {
//   const [reviews, setReviews] = useState([]);
//   const [bookTitle, setBookTitle] = useState("");
//   const [reviewText, setReviewText] = useState("");
//   const [selectedReviewId, setSelectedReviewId] = useState(null);
//   const [isUpdating, setIsUpdating] = useState(false);

//   useEffect(() => {
//     fetchReviews();
//   }, []);

//   const fetchReviews = async () => {
//     try {
//       const response = await fetch(API_ENDPOINT);
//       const data = await response.json();
//       setReviews(data);
//     } catch (error) {
//       console.log("Error fetching book reviews:", error);
//       // Display an error message to the user or handle the error appropriately
//     }
//   };

//   const addReview = async (e) => {
//     e.preventDefault();

//     if (bookTitle.trim() === "" || reviewText.trim() === "") {
//       return;
//     }

//     const newReview = {
//       title: bookTitle,
//       review: reviewText,
//     };

//     if (selectedReviewId) {
//       try {
//         await fetch(`${API_ENDPOINT}/${selectedReviewId}`, {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(newReview),
//         });

//         setReviews((prevReviews) =>
//           prevReviews.map((review) => {
//             if (review.id === selectedReviewId) {
//               return { ...review, ...newReview };
//             }
//             return review;
//           })
//         );

//         setBookTitle("");
//         setReviewText("");
//         setSelectedReviewId(null);
//         setIsUpdating(false);
//       } catch (error) {
//         console.log("Error updating book review:", error);
//         // Display an error message to the user or handle the error appropriately
//       }
//     } else {
//       try {
//         const response = await fetch(API_ENDPOINT, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(newReview),
//         });

//         const data = await response.json();
//         setReviews((prevReviews) => [...prevReviews, data]);

//         setBookTitle("");
//         setReviewText("");
//       } catch (error) {
//         console.log("Error adding book review:", error);
//         // Display an error message to the user or handle the error appropriately
//       }
//     }
//   };

//   const deleteReview = async (reviewId) => {
//     console.log(reviewId); // Add this line to log the reviewId

//     try {
//       await fetch(`${API_ENDPOINT}/${reviewId}`, {
//         method: "DELETE",
//       });

//       setReviews((prevReviews) =>
//         prevReviews.filter((review) => review.id !== reviewId)
//       );
//     } catch (error) {
//       console.log("Error removing book review:", error);
//       // Display an error message to the user or handle the error appropriately
//     }
//   };

//   const editReview = (reviewId) => {
//     const selectedReview = reviews.find((review) => review.id === reviewId);
//     if (selectedReview) {
//       setBookTitle(selectedReview.title);
//       setReviewText(selectedReview.review);
//       setSelectedReviewId(selectedReview.id);
//       setIsUpdating(true);
//     }
//     window.scrollTo(0, 0);
//   };

//   const cancelUpdate = () => {
//     setBookTitle("");
//     setReviewText("");
//     setSelectedReviewId(null);
//     setIsUpdating(false);
//   };

//   return (
//     <div>
//       <h2>Book Reviews</h2>
//       <Table striped bordered>
//         <thead>
//           <tr>
//             <th>Book Title</th>
//             <th>Review</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {reviews.map((review, index) => (
//             <tr key={index}>
//               <td>{review.title}</td>
//               <td>{review.review}</td>
//               <td>
//                 <Button
//                   variant="danger"
//                   onClick={() => deleteReview(review.id)} // Pass the review.id value to deleteReview
//                 >
//                   Delete
//                 </Button>

//                 {isUpdating && selectedReviewId === review.id ? (
//                   <div>
//                     <Button variant="secondary" onClick={cancelUpdate}>
//                       Cancel
//                     </Button>
//                     <Button variant="success" onClick={addReview}>
//                       Update
//                     </Button>
//                   </div>
//                 ) : (
//                   <Button variant="info" onClick={() => editReview(review.id)}>
//                     Edit
//                   </Button>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </Table>
//       <Form onSubmit={addReview}>
//         <Form.Group>
//           <Form.Label>Book Title</Form.Label>
//           <Form.Control
//             type="text"
//             value={bookTitle}
//             onChange={(e) => setBookTitle(e.target.value)}
//           />
//         </Form.Group>
//         <Form.Group>
//           <Form.Label>Review</Form.Label>
//           <Form.Control
//             as="textarea"
//             rows={3}
//             value={reviewText}
//             onChange={(e) => setReviewText(e.target.value)}
//           />
//         </Form.Group>
//         {!isUpdating && (
//           <Button variant="primary" type="submit">
//             Add
//           </Button>
//         )}
//       </Form>
//       <Footer /> {<footer></footer>}
//     </div>
//   );
// }
///broken down code below
//-------------------------------------------------------------------------------------------------------------

import React, { useState, useEffect } from "react"; // Import the Footer components

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Footer from "./Footer"; // Import the Footer components

/*The API_ENDPOINT constant stores the URL for the API endpoint used to fetch and update book reviews.*/

const API_ENDPOINT =
  "https://6478e874362560649a2ea098.mockapi.io/book/bookreviews";

//This is the functional component BookReview that will be exported as the default export.//
//It uses the useState hook to define multiple state variables.
export default function BookReview() {
  const [reviews, setReviews] = useState([]); // stores an array of book reviews.
  const [bookTitle, setBookTitle] = useState(""); //store the values entered in the form inputs
  const [reviewText, setReviewText] = useState(""); //store the values entered in the form inputs
  const [selectedReviewId, setSelectedReviewId] = useState(null); //stores the ID of the selected review for editing or deleting.
  const [isUpdating, setIsUpdating] = useState(false); //is a boolean flag indicating whether the user is in the update mode or not.

  //The useEffect hook is used to fetch the reviews when the component mounts.//

  useEffect(() => {
    fetchReviews(); //The fetchReviews function is an async function that makes a GET request to the API endpoint using fetch.
  }, []); //If the request is successful, it sets the reviews state variable to the received data.

  const fetchReviews = async () => {
    try {
      const response = await fetch(API_ENDPOINT);
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.log("Error fetching book reviews:", error); //If an error occurs, it logs the error to the console.
    }
  };

  const addReview = async (e) => {
    //The addReview function is called when the form is submitted.
    e.preventDefault(); //It prevents the default form submission behavior using

    //It checks if the bookTitle and reviewText are not empty or whitespace.
    if (bookTitle.trim() === "" || reviewText.trim() === "") {
      return;
    }

    const newReview = {
      title: bookTitle,
      review: reviewText,
    };
    // is truthy (indicating an update operation) it makes a PUT request to update the review with the specified ID.
    //If selectedReviewId is falsy (indicating an add operation), it makes a POST request to create a new review.
    if (selectedReviewId) {
      try {
        await fetch(`${API_ENDPOINT}/${selectedReviewId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newReview),
        });
        // After a successful request it Updates the corresponding review in the state
        setReviews((prevReviews) =>
          prevReviews.map((review) => {
            if (review.id === selectedReviewId) {
              return { ...review, ...newReview };
            }
            return review;
          })
        );

        // Reset form fields and selectedReviewId
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

        // Add the new review to the state
        setReviews((prevReviews) => [...prevReviews, data]);

        // Reset form fields
        setBookTitle("");
        setReviewText("");
      } catch (error) {
        console.log("Error adding book review:", error);
        // Display an error message to the user or handle the error appropriately
      }
    }
  };
  /*The deleteReview function is called when the delete button is clicked for a specific review.
It takes the reviewId as an argument and logs it to the console.
*/
  const deleteReview = async (reviewId) => {
    console.log(reviewId); //
    //It makes a DELETE request to the API endpoint to remove the review with the specified ID.

    try {
      await fetch(`${API_ENDPOINT}/${reviewId}`, {
        method: "DELETE",
      });

      setReviews(
        (prevReviews) => prevReviews.filter((review) => review.id !== reviewId) //After a successful request, it updates the state by filtering out the deleted review.
      );
    } catch (error) {
      console.log("Error removing book review:", error);
      // Display an error message to the user or handle the error appropriately
    }
  };
  //The editReview function is called when the edit button is clicked for a specific review
  const editReview = (reviewId) => {
    //It takes the reviewId as an argument.
    const selectedReview = reviews.find((review) => review.id === reviewId); //It finds the selected review from the reviews state using the reviewId.
    //If the selected review is found, it sets the bookTitle, reviewText, selectedReviewId, and isUpdating state variables accordingly.
    if (selectedReview) {
      setBookTitle(selectedReview.title);
      setReviewText(selectedReview.review);
      setSelectedReviewId(selectedReview.id);
      setIsUpdating(true);
    }
    //It also scrolls the window to the top.
    window.scrollTo(0, 0);
  };
  //The cancelUpdate function is called when the cancel button is clicked during an update operation.
  //t resets the bookTitle, reviewText, selectedReviewId, and isUpdating state variables.
  const cancelUpdate = () => {
    setBookTitle("");
    setReviewText("");
    setSelectedReviewId(null);
    setIsUpdating(false);
  };
  /*
The return statement renders the JSX (HTML-like) elements to display the book reviews and the form for adding or updating reviews.
It uses the imported Table, Form, and Button components from react-bootstrap to create the table, form, and buttons.
*/
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
                    <Button variant="dark" onClick={addReview}>
                      Update
                    </Button>
                  </div>
                ) : (
                  <Button variant="dark" onClick={() => editReview(review.id)}>
                    Edit
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Form onSubmit={addReview}>
        {" "}
        {/*The addReview function is passed as the onSubmit handler for the form submission.*/}
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
          <Button variant="dark" type="submit">
            Add
          </Button>
        )}
      </Form>
      <Footer /> {<footer></footer>}
    </div>
  );
}
