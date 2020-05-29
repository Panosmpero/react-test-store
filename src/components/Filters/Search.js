import React, { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";

const Search = () => {
  const { filter, updateInput } = useContext(ProductContext);

  return (
    <div className="search-container">
      <h2>Search</h2>
      <input
        type="text"
        placeholder="Enter Search Keywords..."
        value={filter.search}
        onChange={(e) => updateInput(e.target.value.toLowerCase())}
      />
    </div>
  );
};

export default Search;
