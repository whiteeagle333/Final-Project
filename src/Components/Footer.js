import React from "react";

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
