import React, { useContext } from "react";
import Product from "./Product";
import Title from "./Title";
import { ProductContext } from "../context/ProductContext";
import { v4 as uuidv4 } from "uuid";

const ProductList = () => {
  const { products } = useContext(ProductContext);
  return (
    <div className="products-container">
      <Title title="our" name="products" />
      <div className="products-wrapper">
        {products.storeProducts.map((product) => (
          <Product key={uuidv4()} {...product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
