import React from "react";

const Title = ({ name, title }) => {
  return (
    <div className="text-title">
      <h1>{title}
      <br />{name}</h1>
      
    </div>
  );
};

export default Title;
