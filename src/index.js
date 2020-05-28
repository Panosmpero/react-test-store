import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import ProductContextProvider from "./context/ProductContext";

/*
1. FIXED(div) - click on empty space around image procs Link withou procing state
2. FIXED(added local) - locale storage in order to avoid crushing/loosing cart on refresh 
   FIXED(refresh state cDM) - new - products do not update according to cart  
3. FIXED(syntax) - context clearCart() return with commas
4. FIXED(forgot setState) - cart quantity state doesn't update unless I click Links
5. navbar cart icon transition starts after parent's
6. useReducer on context
7. FIXED - Add controlled input on final cart
   FIXED(uuid kept giving new keys) - new - input cursor loses focus
8. 1/2 FIXED - Add product filters + search
9. fix cart images
*/

ReactDOM.render(
  <ProductContextProvider>
    <Router>
      <App />
    </Router>
  </ProductContextProvider>,
  document.getElementById("root")
);
