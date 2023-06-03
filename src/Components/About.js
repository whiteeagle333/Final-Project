import React from "react";
import BookSection from "./BookSection";
import Footer from "./Footer";
import ParagraphSection from "./ParagraphSection";

export default function About() {
  return (
    <div className="jumbotron jumbotron-fluid" style={{ padding: "40px" }}>
      <div className="container">
        <h4 style={{ textAlign: "center" }}>
          "Rebel Books: Unveiling the Sacred Paths"
        </h4>
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
