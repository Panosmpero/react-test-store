import React, { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";
import Price from "./Price";
import Sort from "./Sort";
import Manufacturer from "./Manufacturer";
import Search from "./Search";

const Filter = () => {
  const { openCloseFilter, showFilter, resetFilter, products } = useContext(
    ProductContext
  );
  return (
    <>
      <div className="filter-title" onClick={() => openCloseFilter()}>
        <h2>FILTERS</h2>
        <i
          className="fas fa-chevron-right"
          style={{ transform: `rotate(${showFilter ? 90 : 0}deg)` }}
        />
      </div>
      {showFilter && (
        <div className="filters-container">
          <div className="filtered-count">
            {products.storeProducts.length} Products Found
          </div>
          <Price />
          <Sort />
          <Manufacturer />
          <Search />
          <button
            className="reset-filter capitalize"
            onClick={() => resetFilter()}
          >
            reset filters
          </button>
        </div>
      )}
    </>
  );
};

export default Filter;
