import React, { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";

const Manufacturer = () => {
  const {
    filter,
    updateManufacturers  
  } = useContext(ProductContext);

  return (
    <>
      <h2>Select Manufacturers</h2>
      <div className="manufacturer-filter">
        <div className="manufacturers">
          {filter.manufacturers.map((m, i) => {
            return (
              <div className="button-wrapper" key={m + i}>
                <button
                  id={m}
                  className="button"
                  onClick={(e) => updateManufacturers(e.currentTarget)}
                >
                  {m}
                </button>
              </div>
            );
          })}
        </div>
        <i className="fas fa-angle-double-right" />
        <div className="manufacturers f-manufacturers">
          {filter.sortedManufacturers.map((m, i) => {
            return (
              <div className="button-wrapper" key={m + i}>
                <button
                  id={m}
                  className="button"
                  onClick={(e) => updateManufacturers(e.currentTarget, false)}
                >
                  {m} <i className="far fa-times-circle" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

/*
// get random color
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
// create an array of random colors
const palette = [...Array(20)].map(x => x = (getRandomColor()))
*/

export default Manufacturer;
