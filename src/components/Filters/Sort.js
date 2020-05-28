import React, { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";

const Sort = () => {
  const { priceSort, products } = useContext(ProductContext);

  return (
    <>
      <h2>Select Price Sort</h2>
      <div className="sort-filter">
        <button
          onClick={(e) => {
            priceSort(e.currentTarget.value);
            console.log(products);
          }}
          value="ascending"
          className="button"
        >
          Ascending<i className="fas fa-arrow-up"></i>
        </button>
        <button
          onClick={(e) => priceSort(e.currentTarget.value)}
          value="descending"
          className="button"
        >
          Descending<i className="fas fa-arrow-down"></i>
        </button>
      </div>
    </>
  );
};

export default Sort;
