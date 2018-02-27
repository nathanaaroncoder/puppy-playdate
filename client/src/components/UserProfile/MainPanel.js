
import React from 'react';
import Avatar from "./Avatar";
import "./UserProfile.css";

  class MainPanel extends React.Component {
    render() {
      var info = this.props.info;
      if (!info) return null;
      
      return (
       
          <div className="top row">
            <div className="col-sm-6">
              <Avatar 
                 image={info.image} 
                 width={300}
                 height={300}
              /> 
              </div>
              <div className="col-sm-6 centerText" >
              <h2>Name: {info.username}</h2>
              <h3>Location: {info.location}</h3>
              <h3>Dog's Name: {info.dogName}</h3>
            <hr />
              <p>Sex: {info.sex}</p>
              <p>Fixed: {info.fixed}</p>
              <p>Last Vaccine: {info.vetDate}</p>
              <p>Likes to go to: {info.places}</p>
          </div>
          </div>
          
      
      );
    }
  }


  export default MainPanel;