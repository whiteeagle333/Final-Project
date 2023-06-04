// import React, { useState } from "react";
// import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";

// export default function BookCover({
//   isbn,
//   title,
//   imageUrl,
//   author,
//   description,
//   onBookSelect,
// }) {
//   const [showModal, setShowModal] = useState(false);

//   const handleShowModal = () => {
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//   };

//   const handleBookSelect = () => {
//     if (typeof onBookSelect === "function") {
//       onBookSelect({ isbn, title, imageUrl });
//     }
//   };

//   return (
//     <div>
//       <img src={imageUrl} alt={title} onClick={handleShowModal} />
//       <Modal show={showModal} onHide={handleCloseModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>{title}</Modal.Title>
//         </Modal.Header>
//         <Modal.Body
//           style={{
//             maxHeight: "400px",
//             overflowY: "auto",
//             scrollbarColor: "red yellow",
//             /* Custom scrollbar styles */
//             scrollbarWidth: "thin",
//             scrollbarTrackColor: "yellow",
//             scrollbarThumbColor: "red",
//           }}
//         >
//           <p>Author: {author}</p>
//           <p>Description: {description}</p>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseModal}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleBookSelect}>
//             Add to Read List
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// }
//-----------------------------------breakdown code below

/*Import statements:
imports the React module and the useState hook from the React library
imports the Modal component from the react-bootstrap library, which provides a pre-styled modal dialog box.
Button component is imported from react-bootstrap as well, which provides pre-styled buttons
*/

import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

/*Component declaration: component is declared as a function named BookCover using the export default syntax,
 indicating that it's the default export of the module. 
 The function takes an object as a parameter containing properties such as isbn, title, etc..etc. 
 properties are destructured from the object parameter.
 */

export default function BookCover({
  isbn,
  title,
  imageUrl,
  author,
  description,
  onBookSelect,
}) {
  /*
  State initialization: The useState hook is used to initialize the showModal state variable and its corresponding setter function setShowModal.
  showModal is set to false initially, indicating that the modal is not visible.
  */
  const [showModal, setShowModal] = useState(false);

  /* Event handlers:
  handleShowModal is a function that sets the showModal state variable to true, which displays the modal.
  handleCloseModal is a function that sets the showModal state variable to false, which hides the modal.
  handleBookSelect is a function that checks if onBookSelect is a function and then calls it with an object 
  containing isbn, title, and imageUrl properties.
  */

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleBookSelect = () => {
    if (typeof onBookSelect === "function") {
      onBookSelect({ isbn, title, imageUrl });
    }
  };

  /*Rendering:
 The component returns JSX (a mix of HTML and JavaScript).
 It renders an img element with the book cover's imageUrl and title.
 The onClick event is set to handleShowModal so that when the image is clicked, the modal is displayed.
 The Modal component is rendered with the show prop set to the value of showModal and the onHide prop set to handleCloseModal.
 This controls the visibility and behavior of the modal dialog box. 
 */
  return (
    // Modal contents//
    <div>
      <img src={imageUrl} alt={title} onClick={handleShowModal} />
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body
          style={{
            maxHeight: "400px",
            overflowY: "auto",
            scrollbarColor: "red yellow",
            /* Custom scrollbar styles */
            scrollbarWidth: "thin",
            scrollbarTrackColor: "yellow",
            scrollbarThumbColor: "red",
          }}
        >
          <p>Author: {author}</p>
          <p>Description: {description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="dark" onClick={handleBookSelect}>
            Add to Read List
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
