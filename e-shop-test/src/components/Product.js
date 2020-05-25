import React, { useContext } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { ProductContext } from "../context/ProductContext";

const Product = (props) => {
  
  const { id, title, img, price, inCart } = props;
  const { handleDetail, addToCart, openModal } = useContext(ProductContext);
  
  return (
    <div className="product">

      <div>
        <Link to="/details">
          <img
            src={img}
            alt="product"
            className="product-image"
            onClick={() => handleDetail(id)}
            height="80%"
            width="80%"
          />

        </Link>
      </div>

      <button
        className="add-cart-btn"
        disabled={inCart ? true : false}
        onClick={() => {
          addToCart(id);
          openModal(id);
        }}
      >
        {inCart ? <p>In Cart</p> : <i className="fas fa-cart-plus"></i>}
      </button>
      
      <div className="product-footer">
        <h5>{title}</h5>
        <p>{`${price} €`}</p>
      </div>
    </div>
  );
};

// Props Type Check
Product.propTypes = {
  id: PropTypes.number,
  img: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.number,
  inCart: PropTypes.bool,
};

export default Product;
