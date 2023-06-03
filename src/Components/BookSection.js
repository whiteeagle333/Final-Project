import React from "react";
import bookImage from "../images/libary.jpg";
import "./BookSection.css"; // Import the CSS file

export default function BookSection() {
  return (
    <>
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
