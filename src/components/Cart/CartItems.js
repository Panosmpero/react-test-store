import React, { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";
import { Link } from "react-router-dom";

const CartItems = () => {
  const { cart, removeItem, handleClick, handleDetail, handleChange } = useContext(
    ProductContext
  );

  return (
    <>
      {cart.length === 0 ? (
        <p>No items in the cart</p>
      ) : (
        cart.map(({img, id, title, price, count, total}) => {
          return (
            <div className="cart-wrapper" key={title+id}>
              <img src={img} alt="product" />

              <Link to="/details">
                <div onClick={() => handleDetail(id)}>
                  {title}
                </div>
              </Link>
              
              <div className="bolder">{price} €</div>
              <div className="quantity-check">
                <button
                  onClick={(e) => handleClick(id, e.target.value)}
                  value="-"
                >
                  -
                </button>

                
                <input type="number" value={count} onChange={(e) => handleChange(id, e.target.value)} />

                <button
                  onClick={(e) => handleClick(id, e.target.value)}
                  value="+"
                >
                  +
                </button>
              </div>
              <button
                className="far fa-trash-alt"
                id="delete-btn"
                onClick={() => removeItem(id)}
              ></button>
              <div className="bolder">{total * count} €</div>
            </div>
          );
        })
      )}
    </>
  );
};

export default CartItems;
