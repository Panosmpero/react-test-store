import React, { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import Title from "./Title"

const Details = () => {
  const { detail, addToCart, openModal } = useContext(ProductContext);
  const { id, company, img, info, price, title, inCart } = detail;

  return (
    <div className="details-container">
      <Title title={title}  />
      <div className="details-wrapper">

        <img src={img} alt="phone" className="details-image" />
        <div className="text-wrapper capitalize">
          <h2 className="model-title">{`Model: ${title}`}</h2>
          <div>
            made by: <span className="text-title">{company}</span>
          </div>
          <h3>{`price: ${price} €`}</h3>
          <h4>Additional Info:</h4>
          <p>{info}</p>

          {inCart ? (
            <div className="alt-text">--Already In Cart--</div>
          ) : (
            <button
              className="add-cart-btn"
              onClick={() => {
                addToCart(id);
                openModal(id);
              }}
            >
              Add To Cart
            </button>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default Details;
