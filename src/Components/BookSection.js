// import React from "react";
// import bookImage from "../images/libary.jpg";
// import "./BookSection.css"; // Import the CSS file

// export default function BookSection() {
//   return (
//     <>
//       <div className="banner-container">
//         <img src={bookImage} alt="Book" className="banner-image" />
//       </div>
//       <br />
//       <br />
//       <h3 style={{ fontWeight: "bold" }}>About</h3>
//       <br />
//       <h3>Welcome to Rebel Books,</h3>
//     </>
//   );
// }
// the break down below import React from "react";

import bookImage from "../images/libary.jpg"; //Importing Assets:
import "./BookSection.css"; // Import the CSS file/ Styles

//Component Definition:This code defines a React functional component named BookSection and exports it as the default export of this module.
export default function BookSection() {
  return (
    <>
      {/*/Component body
     It returns JSX (a combination of JavaScript and HTML-like syntax) that represents the structure and content of the component.
    */}

      <div className="banner-container">
        <img src={bookImage} alt="Book" className="banner-image" />
      </div>
      <br />
      <br />
      <h3 style={{ fontWeight: "bold" }}>About</h3>
      <br />
      <h3>Welcome to Rebel Books,</h3>
    </>
  );
}
