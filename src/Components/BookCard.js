// import React from "react";
// import Card from "react-bootstrap/Card";
// import Button from "react-bootstrap/Button";

// export default function BookCard({ book, onBookSelect }) {
//   const { title, imageUrl } = book;

//   return (
//     <>
//       <Card style={{ width: "100%" }}>
//         <Card.Img variant="top" src={imageUrl} alt={title} />
//         <Card.Body>
//           <Card.Title>{title}</Card.Title>
//         </Card.Body>
//       </Card>
//       <Button onClick={() => onBookSelect(book)}>Add to Read List</Button>
//     </>
//   );
// }
//code below broken down with comments

/* This section imports the necessary dependencies for the component.
 It imports React from the "react" package and the Card and Button components 
 from the "react-bootstrap" package.*/

import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

/* This line exports a React functional component called BookCard as the default export.
 It takes in two props: book and onBookSelect. */
export default function BookCard({ book, onBookSelect }) {
  /*This line uses object destructuring to extract the title and imageUrl properties from the book prop.*/

  const { title, imageUrl } = book;

  /*This is the main body of the component. It returns JSX code representing the component's UI. */

  /* The BookCard component returns two elements enclosed in a React fragment. 
The first element is a Card component that displays an image (imageUrl) and a title (title).
 The second element is a Button component labeled "Add to Read List". 
 Clicking the button invokes the onBookSelect function with the book prop as an argument. 
This component represents a reusable book card with an image, title, and a button to add it to a read list.*/
  return (
    <>
      <Card style={{ width: "100%", backgroundColor: "black", color: "white" }}>
        <Card.Img variant="bottom" src={imageUrl} alt={title} />
        <Card.Body>
          <Card.Title style={{ fontSize: "18px" }}>{title}</Card.Title>
        </Card.Body>
      </Card>

      <Button
        style={{ backgroundColor: "black", color: "white" }}
        onClick={() => onBookSelect(book)}
      >
        Add to Read List
      </Button>
    </>
  );
}
