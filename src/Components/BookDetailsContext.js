// BookDetailsContext.js
import React, { createContext, useState } from "react";

const BookDetailsContext = createContext();

export function BookDetailsProvider({ children }) {
  const [bookDetails, setBookDetails] = useState("");

  return (
    <BookDetailsContext.Provider value={{ bookDetails, setBookDetails }}>
      {children}
    </BookDetailsContext.Provider>
  );
}

export default BookDetailsContext;
