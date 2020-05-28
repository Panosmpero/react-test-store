import React, { useContext } from "react";
import { ProductContext } from "../../context/ProductContext";
import styled from "styled-components";

const Filter = () => {
  const { filterProducts, slider, minRange, maxRange } = useContext(
    ProductContext
  );  

  return (
    <div className="range-filter">
      <h2>Select Price Range</h2>
      <div className="slider-wrapper">
        <div className="multi-range-slider">
          <input
            id="slider-A"
            type="range"
            min={minRange}
            max={maxRange}
            step="1"
            onChange={(e) => filterProducts(e.target)}
            value={slider.valueA}
          />
          <input
            id="slider-B"
            type="range"
            min={minRange}
            max={maxRange}
            step="1"
            onChange={(e) => filterProducts(e.target)}
            value={slider.valueB}
          />
          <div className="slider">
            <div className="track"></div>
            <Range
              rangeLeft={slider.rangeLeft + "%"}
              rangeRight={slider.rangeRight + "%"}
            />
            <Tip tip="A" range={slider.rangeLeft + "%"}>{slider.valueA} €</Tip>
            <Tip tip="B" range={slider.rangeRight + "%"}>{slider.valueB} €</Tip>
            <Thumb thumb="A" range={slider.rangeLeft + "%"} />
            <Thumb thumb="B" range={slider.rangeRight + "%"} />
          </div>
        </div>
      </div>
    </div>
  );
};

const Range = styled.div`
  position: absolute;
  z-index: 2;
  left: ${(props) => props.rangeLeft};
  right: ${(props) => props.rangeRight};
  top: 0;
  bottom: 0;
  border-radius: 5px;
  background: var(--blue);
`;

const Thumb = styled.div`
  position: absolute;
  z-index: 3;
  width: 30px;
  height: 30px;
  background: radial-gradient(circle, #f3f3f3 0%, #19c9ff 20%, #21215c 65%);
  border-radius: 50%;
  /* ? left: % : right: % */
  ${(props) => (props.thumb === "A" ? "left" : "right")}: 
  ${(props) => props.range};
    
  transform: translate(
    ${(props) => (props.thumb === "A" ? "-15px, -10px" : "15px, -10px")}
  );
`;

const Tip = styled.div`
  position: absolute;
  z-index: 3;
  min-width: 50px;
  height: 30px;
  border-radius: 10px;
  border: 2px var(--blue) solid;
  color: var(--blue);
  background: var(--lightblue);
  padding: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bolder;

  ${props => props.tip === "A" ? "left" : "right"}: 
  ${props => props.range};

  transform: translate(
    ${props => props.tip === "A" ? "-27px, -65px" : "27px, -65px"}
  );
`;

export default Filter;
