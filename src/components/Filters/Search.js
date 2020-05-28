import React, { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";

const Search = () => {
  const { search, updateInput, changeFocus } = useContext(ProductContext);

  return (
    <div className="search-container">
      <h2>Search</h2>
      <input
        type="text"
        placeholder="Enter Search Keywords..."
        value={search}
        onChange={(e) => updateInput(e.target.value)}
        onFocus={() => changeFocus()}
        onBlur={() => changeFocus()}
      />
    </div>
  );
};

export default Search;
