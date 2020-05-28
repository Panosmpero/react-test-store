import React, { useContext } from "react";
import Product from "./Product";
import Title from "./Title";
import { ProductContext } from "../context/ProductContext";
import { v4 as uuidv4 } from "uuid";
import Filter from "./Filters/Filter";

const ProductList = () => {
  const { products } = useContext(ProductContext);

  return (
    <div className="products-container">
      <Title title="our" name="products" />
      <Filter />
      <div className="products-wrapper">
        {products.storeProducts.length ? (
          products.storeProducts.map((product) => (
            <Product key={uuidv4()} {...product} />
          ))
        ) : (
          <div className="capitalize" style={{ fontSize: "1.4rem" }}>
            no products were found...
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
