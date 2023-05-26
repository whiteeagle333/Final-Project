import React, { createContext, useState } from "react";

export const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [selectedBooks, setSelectedBooks] = useState([]);

  const addBookToReadList = (isbn) => {
    setSelectedBooks((prevSelectedBooks) => [...prevSelectedBooks, isbn]);
  };

  return (
    <BookContext.Provider value={{ selectedBooks, addBookToReadList }}>
      {children}
    </BookContext.Provider>
  );
};
