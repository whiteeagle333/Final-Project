// import React from "react";
// // this code is for the footer
// export default function Footer() {
//   return (
//     <footer style={{ marginTop: "20px", textAlign: "center" }}>
//       <p>
//         &copy; {new Date().getFullYear()} Emmanuel White Eagle, Rebel Books. All
//         rights reserved.
//       </p>
//     </footer>
//   );
// }
//--------------breakdown below --------------------
// this code is for the footer
import React from "react";
// Defining the Footer component
// and Returning JSX the component returns JSX, which represents the structure and content of the component
export default function Footer() {
  return (
    <footer style={{ marginTop: "20px", textAlign: "center" }}>
      <p>
        &copy; {new Date().getFullYear()} Emmanuel White Eagle, Rebel Books. All
        rights reserved.
      </p>
    </footer>
  );
}
