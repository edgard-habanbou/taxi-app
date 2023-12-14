import React from "react";
import "./index.css";
const Button = ({ onClick, children, className = null }) => {
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
};

export default Button;
