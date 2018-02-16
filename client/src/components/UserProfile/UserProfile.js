import React from 'react';
import MainPanel from "./MainPanel";
import profiles from "../../profiles.json";
import "./UserProfile.css";

// const user = {
//     basicInfo: {
//       name: "Jane Doe",
//       gender: "Female",
//       dogname: "Pepe",
//       location: "Somerset, NJ",
//       photo: "http://lorempixel.com/500/500/people",
//       bio: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat fugit quia pariatur est saepe necessitatibus, quibusdam reiciendis ratione voluptate atque in qui provident rem repellat soluta. Blanditiis repellat velit eligendi."
//     }
//   }
  
    const UserProfile = props => {
      return (
    
   
        <div id="user-profile">
          <MainPanel info={props} />
        </div>
     
     )
  }
  
 // React.render(<UserProfile />, document.getElementById('root'))

 export default UserProfile;