import React from "react";
import CartCaption from "./CartCaption";
import CartItems from "./CartItems";
import CartTotal from "./CartTotal";
import Title from "../Title";

const Cart = () => {
  
  return (
    <div className="cart-container">
      <Title title="My" name="Cart" />
      <CartCaption />
      <CartItems />
      <CartTotal />
    </div>
  );
};

export default Cart;
