import React from "react";
import "./AnimatedSpinner.scss";

const AnimatedSpinner = () => {
  return (
    <div className="lds-ring">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default AnimatedSpinner;
