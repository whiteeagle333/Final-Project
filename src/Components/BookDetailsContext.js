// BookDetailsContext

// import React, { createContext, useState } from "react";

// const BookDetailsContext = createContext();

// export function BookDetailsProvider({ children }) {
//   const [bookDetails, setBookDetails] = useState("");

//   return (
//     <BookDetailsContext.Provider value={{ bookDetails, setBookDetails }}>
//       {children}
//     </BookDetailsContext.Provider>
//   );
// }

// export default BookDetailsContext;
///breaking down code below

import React, { createContext, useState } from "react";

/*Create a new context
creates a new context using the createContext function.
 The BookDetailsContext object will be used to provide
  and consume data within its component tree.
*/
const BookDetailsContext = createContext();

/* Provider component
This line defines a new functional component BookDetailsProvider
 It accepts a prop called children, which represents the components wrapped by this provider. 
*/
export function BookDetailsProvider({ children }) {
  /* State initialization using useState 
  This line initializes a state variable named bookDetails using the useState hook. */

  const [bookDetails, setBookDetails] = useState("");

  /*Return Statement: Render the context provider with the state value and setter as the value prop
  This block of code is the return statement of the BookDetailsProvider component. It returns the JSX code that will be rendered to the DOM.
  */
  return (
    <BookDetailsContext.Provider value={{ bookDetails, setBookDetails }}>
      {children}
    </BookDetailsContext.Provider>
  );
}
// Export the context for use in other components
export default BookDetailsContext;
