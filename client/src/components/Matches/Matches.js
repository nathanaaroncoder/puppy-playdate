import React from "react";
import "./Matches.css";
// import SwipeComponent from "../SwipeComponent"
import SimpleCarousel from "../SimpleCarousel"

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const Matches = props => (
	<div className="card">
    <div className="img-container">
    
    <SimpleCarousel/>


    </div>
    
    
  </div>
);

export default Matches;
