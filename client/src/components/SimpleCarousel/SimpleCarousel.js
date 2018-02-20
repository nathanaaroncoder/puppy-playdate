import React from 'react';
import axios from 'axios';
import Swipeable from 'react-swipeable';
import "./SimpleCarousel";
import UserProfile from "../UserProfile";

const IMG_WIDTH = "342px";
const IMG_HEIGHT = "249px";

const RIGHT = 'right';
const LEFT = 'left';

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
      thatUser: null
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
      const excludeUser = shuffled.filter(dog => dog.local.username !== this.state.user );
      console.log("user here", this.state.user);
      this.setState({dogs: excludeUser});
      console.log("excluding", excludeUser);
		
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
    const change = direction === RIGHT ? RIGHT : LEFT;
    const adjustedIdx = this.state.imageIdx + 1;
    let newIdx;
    if (adjustedIdx >= this.state.dogs.length) {
      newIdx = 0;
    } else {
      newIdx = adjustedIdx;
    }
    this.setState({ imageIdx: newIdx });
    //doing imageIdx - 1 so that it grabs what was on the page before (not the one that just showed up)
    if (this.state.imageIdx === 0){
      this.setState({ thatUser: this.state.dogs[this.state.dogs.length - 1] })
    } else {
      this.setState({ thatUser: this.state.dogs[this.state.imageIdx - 1] });
    }
    
    console.log("thatUser username", this.state.thatUser.local.username);
    if (change === RIGHT){
      console.log("this.state.thatUser before request", this.state.thatUser);
      axios.get("/auth/signup", {
        thatUser: this.state.thatUser.local.username
      }).then(res => {
        console.log("res.data in swipe right", res.data);
        console.log("this.state.thisUser", this.state.user);
       const index = res.data[0].saidYes.findIndex(person => person == this.state.user);
       if (index > -1){
            axios.put("/auth/signup", {
              thisUser: this.state.user,
              thatUser: this.state.thatUser,
              matched: true
            }).then(res => {
              console.log("sent this,", res);
            }).catch(err => console.log(err))
       }
        axios.put("/auth/signup", {
          thisUser: this.state.user,
          saidYes: this.state.thatUser.local.username
        }).then(res => {
          console.log("sent this,", res);
        }).catch(err => console.log(err))
       
      })
      
    }


    if (change === LEFT){
      axios.put("/auth/signup", {
        thisUser: this.state.user,
        saidNo: this.state.thatUser.local.username
      }).then(res => {
        console.log("sent this,", res);
      }).catch(err => console.log(err))
    }
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