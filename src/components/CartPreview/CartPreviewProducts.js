import React, { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";
import { v4 as uuidv4 } from "uuid";
import {Link} from "react-router-dom";

const CartPreviewProducts = () => {

  const { cart, removeItem, handleDetail } = useContext(ProductContext);

  return (
    <>
      <h3>{cart.length} Products</h3>
      
      {cart.length === 0 ? (
        <p>No items in the cart</p>
      ) : (
        cart.map(({img, id, count, title, price}) => {
          return (
            <div key={uuidv4()}>
              <div className="cart-mini">
                <img src={img} alt="product" />
                <h4>
                  <Link to="/details" onClick={() => handleDetail(id)} >
                    <p>{count}x {title}</p>
                  </Link>
                  <p>Price: {price} €</p>
                </h4>
                <i
                  className="far fa-trash-alt"
                  onClick={() => removeItem(id)}
                ></i>
              </div>
            </div>
          );
        })
      )}
    </>
  );
};

export default CartPreviewProducts;
