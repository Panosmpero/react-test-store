import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import styled from "styled-components";

const Navbar = () => {
  const { showHideCart, showCart } = useContext(ProductContext);
  return (
    <div className="navbar">
      
      <Link to="/" className="navbar-el">
        <i className="fas fa-home"></i>
      </Link>

      <Link to="/" className="nav-products-link navbar-el">
        Products
      </Link>

      <div
        className="nav-cart-link navbar-el capitalize"
        onClick={() => showHideCart()}
      >
        <CartIcon className="fas fa-shopping-cart" reverse={showCart} />
        my cart
      </div>
    </div>
  );
};

const CartIcon = styled.i`
transform: scale(${props => props.reverse ? "-1,1" : "1,1"});
margin: .5rem;
transition: inherit;
`

export default Navbar;
