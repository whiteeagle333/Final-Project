// import React, { createContext, useState } from "react";

// export const BookContext = createContext();

// export const BookProvider = ({ children }) => {
//   const [selectedBooks, setSelectedBooks] = useState([]);

//   const addBookToReadList = (isbn) => {
//     setSelectedBooks((prevSelectedBooks) => [...prevSelectedBooks, isbn]);
//   };

//   return (
//     <BookContext.Provider value={{ selectedBooks, addBookToReadList }}>
//       {children}
//     </BookContext.Provider>
//   );
// };
/// code breakdown below //
//-------------------------------------------------------------------------------------------------

/*Import Statements 
This code imports the necessary modules from the React library.
 It imports React, createContext, and useState functions.*/

import React, { createContext, useState } from "react";

/* Context Creation:This code creates a new Context object called BookContext using the createContext function.
 This context will be used to share data between components in a React component tree.*/

export const BookContext = createContext();

/*Provider Component: This code defines a BookProvider component that manages a state variable called selectedBooks and a function 
addBookToReadList using the useState hook. It provides these values to the child components by wrapping them with the BookContext.
Provider component. This allows the child components to access and use the selectedBooks
 array and addBookToReadList function through the context.*/

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
