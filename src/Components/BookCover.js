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
//         <Modal.Body>
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
//---------------------------
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
//         <Modal.Body style={{ maxHeight: "400px", overflowY: "auto" }}>
//           <style>
//             {`
//               /* For Chrome, Safari, and Opera */
//               ::-webkit-scrollbar {
//                 width: 10px;
//               }
//               ::-webkit-scrollbar-track {
//                 background-color: yellow;
//               }
//               ::-webkit-scrollbar-thumb {
//                 background-color: red;
//               }
//             `}
//           </style>
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
//---------------------
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export default function BookCover({
  isbn,
  title,
  imageUrl,
  author,
  description,
  onBookSelect,
}) {
  const [showModal, setShowModal] = useState(false);

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

  return (
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
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleBookSelect}>
            Add to Read List
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
