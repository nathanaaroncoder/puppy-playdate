
import React from 'react';
import Avatar from "./Avatar";
import "./UserProfile.css";

  class MainPanel extends React.Component {
    render() {
      var info = this.props.info;
      if (!info) return null;
      
      return (
       <div>
          <div className="top">
              <Avatar 
                 image={info.image} 
                 width={300}
                 height={300}
              /> 
              <h2>Name: {info.name}</h2>
              <h3>Location: {info.location}</h3>
              <h3>Dog's Name: {info.occupation}</h3>
            <hr />
              <p>Gender: Female</p>
          </div>
          
          <div className="bottom">
            <h4>About Me:</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat fugit quia pariatur est saepe necessitatibus, 
            quibusdam reiciendis ratione voluptate atque in qui provident rem repellat soluta. Blanditiis repellat velit eligendi.
</p>
          </div>
        </div>
      );
    }
  }


  export default MainPanel;