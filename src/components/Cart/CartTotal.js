import React, { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";
import PayPalButton from "./PayPalButton";
import { useHistory } from "react-router-dom";

const CartTotal = () => {
  const { cart, clearCart, sum } = useContext(ProductContext);
  const history = useHistory();

  const totalSum = sum();
  const preTax = Math.round((totalSum / 1.24) * 100) / 100;
  const tax = Math.round((totalSum - preTax) * 100) / 100;

  return (
    <>
      <div className="total">
        <button className="clear" onClick={() => clearCart()}>
          Clear Cart
        </button>
        <div>
          <span className="text-title">Pre-Tax: </span>
          {preTax} €
        </div>
        <div>
          <span className="text-title">Tax 24%: </span>
          {tax} €
        </div>
        <div className="grand-total">
          <span className="text-title">Total: </span>
          {cart.length === 0 ? 0 : totalSum} €
        </div>
        <PayPalButton total={totalSum} clearCart={clearCart} history={history} />
      </div>
    </>
  );
};

export default CartTotal;
