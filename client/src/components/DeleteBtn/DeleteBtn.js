import React from "react";
import "./RadioBtn.css";

// The ...props means, spread all of the passed props onto this element That way
// we don't have to define them all individually
const DeleteBtn = props => (
  <span className="radio-btn" {...props}>
    ✗
  </span>
);

export default RadioBtn;
