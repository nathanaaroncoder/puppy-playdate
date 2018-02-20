import React from 'react';
import axios from 'axios';
import Swipeable from 'react-swipeable';
import "./SimpleCarousel";
import UserProfile from "../UserProfile";


// import FriendCard from "../FriendCard";

import profiles from "../../profiles.json";

const IMG_1 = `https://unsplash.it/342/249`;
const IMG_2 = `https://unsplash.it/342/250`;
const IMG_3 = `https://unsplash.it/342/251`;
const IMG_4 = `https://unsplash.it/342/252`;
const IMG_5 = `https://unsplash.it/342/253`;
const IMAGES = [IMG_1, IMG_2, IMG_3, IMG_4, IMG_5];
const IMG_WIDTH = "342px";
const IMG_HEIGHT = "249px";

const RIGHT = '+1';
const LEFT = '+1';

const buttonStyles = {
  height: IMG_HEIGHT,
  color: "#eeeeee",
  fontSize: "2em",
};

class SimpleCarousel extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { 
      imageIdx: 0,
      user: null,
      dogs: [],
      currentDog: null
    }
  }

  findDogs = () => {
    axios.get('/auth/user').then(response => {
      if (response.data.user) {
        this.setState({
					user: response.data.user.local.username
        })
      }
    })
		axios.get('/auth/signup').then(res => {
			console.log(res.data);
      const allDogs = res.data;
      const shuffled = allDogs.sort(() => Math.random() - 0.5);
      const excludeUser = shuffled.filter(dog => dog.local.username !== this.state.user )
      console.log("user here", this.state.user)
      this.setState({dogs: excludeUser});
      console.log("excluding", excludeUser)
		
		})
  }
  
  componentDidMount(){
    this.findDogs();
  }

  componentDidUpdate() {
		console.log("AFTER UPDATE", this.state.dogs);
	}

  // _login(username, password) {
	// 	axios
	// 		.post('/auth/login', {
	// 			username,
	// 			password
	// 		})
	// 		.then(response => {
	// 			console.log(response)
	// 			if (response.status === 200) {
	// 				// update the state
	// 				this.setState({
	// 					loggedIn: true,
	// 					user: response.data.user
	// 				})
	// 			}
	// 		})
	// }

  onSwiped(direction) {
    const change = LEFT;
    const adjustedIdx = this.state.imageIdx + Number(change);
    let newIdx;
    if (adjustedIdx >= this.state.dogs.length) {
      newIdx = 0;
    } else if (adjustedIdx < 0) {
      newIdx = IMAGES.length - 1
    } else {
      newIdx = adjustedIdx;
    }
    this.setState({ imageIdx: newIdx });
    //doing imageIdx - 1 so that it grabs what was on the page before (not the one that just showed up)
    if (this.state.imageIdx === 0){
      this.setState({ currentDog: this.state.dogs[this.state.dogs.length - 1] })
    } else {
      this.setState({ currentDog: this.state.dogs[this.state.imageIdx - 1] });
    }
    
    console.log("currentDog username", this.state.currentDog.local.username);
    // if (change === LEFT){
      axios.put("/auth/signup", {
        username: this.state.user,
        match: this.state.currentDog.local.username
      }).then(res => {
        console.log("sent this," + res);
      })
    // }
  }

//   const friendsArr = {(friends).map(friend =>{
//   return <FriendCard 
//           key={friend.id} 
//           id={friend.id} 
//           name={friend.name} 
//           image={friend.image} 
//           occupation={friend.occupation} 
//           location={friend.location} 
//           removeFriend={this.removeFriend}

//           />
//   })
// }

  render() {
    const { imageIdx = 0 } = this.state;
    const imageStyles = {
      width: IMG_WIDTH,
      height: IMG_HEIGHT,
      // backgroundImage: `url(${IMAGES[imageIdx]})`
    };
    return (
      <div className="swipeContainer">
        <div>Image: {imageIdx + 1}</div>
        <Swipeable 
          className="swipe"
          trackMouse
          style={{ touchAction: 'none' }}
          preventDefaultTouchmoveEvent
          onSwipedLeft={()=>this.onSwiped(LEFT)}
          onSwipedRight={()=>this.onSwiped(RIGHT)}
        >
          <div  >
            {this.state.dogs.length ? (<UserProfile
          key={this.state.dogs[imageIdx]._id} 
          id={this.state.dogs[imageIdx]._id} 
          name={this.state.dogs[imageIdx].local.username} 
          image={this.state.dogs[imageIdx].local.username} 
          occupation={this.state.dogs[imageIdx].dogName} 
          location={this.state.dogs[imageIdx].dogName} 

            />) : (
              <h2>No Results to Display</h2>
            ) }
           
            <button
              onClick={()=>this.onSwiped(RIGHT)}
              className="hollow float-left"
              style={buttonStyles}>⇦</button>

              <button
              onClick={()=>this.onSwiped(LEFT)}
              className="hollow float-right"
              style={buttonStyles}>⇨</button>
            
            
          </div>
        </Swipeable>
       
      </div>
    )
  }
}

export default SimpleCarousel;