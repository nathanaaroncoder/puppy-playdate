
import React from 'react';
import "./UserProfile.css";



 class Avatar extends React.Component {
    render() {
      var image = this.props.image;
          // style = {
          //   width: this.props.width || 50,
          //   height: this.props.height || 50
          // }; 
      
      // if (!image) return null;
      
      return (
       <div className="avatar" >
             <img src={this.props.image ? this.props.image : "https://img0.etsystatic.com/034/0/6643643/il_570xN.619857698_8val.jpg"} className="profileImage" /> 
        </div>
      );
    }
  }

    export default Avatar;