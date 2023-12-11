import React from "react";
import "./index.css";
const TextInput = ({ placeholder, onChange, type = "text" }) => {
  return (
    <div className="input-wrapper">
      <input
        type={type}
        className="modern-input"
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default TextInput;
