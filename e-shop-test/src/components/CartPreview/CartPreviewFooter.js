import React, { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";
import { Link } from "react-router-dom";

const CartPreviewFooter = () => {

  const { cart, showHideCart, sum } = useContext(ProductContext);

  return (
    <>
      <footer className="mini-total">
        Total:{" "}
        {cart.length === 0
          ? 0
          : sum()}{" "}
        €
      </footer>
      
      <Link to="/cart" onClick={() => showHideCart()}>
        <button className="move-to-cart-btn">Move To Cart</button>
      </Link>
    </>
  );
};

export default CartPreviewFooter;
