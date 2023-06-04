// import React from "react";
// import BookSection from "./BookSection";
// import Footer from "./Footer";
// import ParagraphSection from "./ParagraphSection";

// export default function About() {
//   return (
//     <div className="jumbotron jumbotron-fluid" style={{ padding: "40px" }}>
//       <div className="container">
//         <h4 style={{ textAlign: "center" }}>
//           "Rebel Books: Unveiling the Sacred Paths"
//         </h4>
//         <br />
//         <BookSection />
//         <br />
//         <ParagraphSection />
//         <br />
//         <Footer />
//       </div>
//     </div>
//   );
// }
//code below is with breakdown

//The code starts by importing necessary components from external files:
import React from "react";
import BookSection from "./BookSection";
import Footer from "./Footer";
import ParagraphSection from "./ParagraphSection";

//The About component is defined as a functional component using the export default syntax.

export default function About() {
  /* The About component returns JSX code wrapped in a div element
   with the class name "jumbotron jumbotron-fluid".
   Inline styles are applied to this div element using the style prop:   */
  return (
    <div className="jumbotron jumbotron-fluid" style={{ padding: "40px" }}>
      {/* Inside the div container, there is another div element with the class name "container".*/}

      <div className="container">
        <h4 style={{ textAlign: "center" }}>
          "Rebel Books: Unveiling the Sacred Paths"
        </h4>
        {/*The BookSection component is rendered using a self-closing JSX tag:
       same would be for the two more components below */}
        <br />
        <BookSection />
        <br />
        <ParagraphSection />
        <br />
        <Footer />
      </div>
    </div>
  );
}
/*That's a breakdown of the code. It renders a layout for an "About" page, 
consisting of a jumbotron-like container with a heading, 
followed by the BookSection that was never used but only using it for a banner or image , ParagraphSection, and Footer components. 
The line breaks <br /> are used for spacing elements vertically. */
