import React from 'react';
import axios from 'axios';
import API from '../../utils/API';
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
      // shuffles all the dogs
      const shuffled = allDogs.sort(() => Math.random() - 0.5);
      //gives you the current user's data from the whole list
      const currentUserData = allDogs.filter(dog => dog.local.username == this.state.user);
      console.log("current user data", currentUserData[0]);
      // current user's yes's
      const saidYesList = currentUserData[0].saidYes;
      console.log("said yes list", saidYesList);
      // current user's no's
      const saidNoList = currentUserData[0].saidNo;
      console.log("said no list", saidNoList); 
      // excludes the current user from the list of potential matches     
      const excludeUser = shuffled.filter(dog => dog.local.username !== this.state.user);
       // an array that can be altered with each filter
       let filteredList = excludeUser;

      excludeUser.forEach(user => {
        if(user.saidNo.includes(this.state.user)){
          filteredList = filteredList.filter(person => person.local.username !== user.local.username)
        }
      })


     
      // an array of just the usernames
      const usernames = filteredList.map(person => person.local.username);
      console.log("usernames", usernames);
      // looping through these usernames
      usernames.forEach(username => {
        // if the username is included in the saidYesList of the current user,
        // then it gets filtered out
        if(saidYesList.includes(username)){
          filteredList = filteredList.filter(person => person.local.username !== username)
        }
        // if the username is included in the saidNoList of the current user,
        // then it gets filtered out
        if(saidNoList.includes(username)){
         filteredList = filteredList.filter(person => person.local.username !== username)          
        }
      })

   


      console.log("user here", this.state.user);
      // sets the state of dogs to the new list of all the filters
      this.setState({dogs: filteredList});
      console.log("excluding", filteredList);
		
		})
  }
  
  componentDidMount(){
    this.findDogs();
  }

  componentDidUpdate() {
		console.log("AFTER UPDATE", this.state.dogs);
	}

  onSwiped(direction) {
    const change = direction === RIGHT ? RIGHT : LEFT;
    const adjustedIdx = this.state.imageIdx + 1;
    let newIdx;
    let newThatUser;
    let emptyDogs;

    if (adjustedIdx >= this.state.dogs.length) {
      newIdx = 0;
    } else {
      newIdx = adjustedIdx;
    }
    

    //doing imageIdx - 1 so that it grabs what was on the page before (not the one that just showed up)
    if (newIdx === 0){
      newThatUser = this.state.dogs[this.state.dogs.length - 1];
    } else {
      newThatUser = this.state.dogs[newIdx - 1];
    }
    
    console.log("thatUser username", newThatUser.local.username);
    if (change === RIGHT){
      console.log("this.state.thatUser before request", newThatUser);
      API.getDogs({
        thatUser: newThatUser.local.username
      }).then(res => {
        console.log("res.data in swipe right", res.data);
        console.log("this.state.thisUser", this.state.user);
        // find the index of thatUser in the res.data arr
        const indexThatUser = res.data.map(person => person.local.username ).indexOf(newThatUser.local.username);
       console.log("indexThatUser", indexThatUser);
       //check if thatUser already saidYes to the current user
       const index = res.data[indexThatUser].saidYes.findIndex(person => person == this.state.user);
       console.log("index", index);
       if (index > -1){
            API.signUp({
              thisUser: this.state.user,
              thatUser: newThatUser.local.username,
              matches: true
            }).then(res => {
              console.log("getting this back,", res);
            }).catch(err => console.log(err))
       }
        API.signUp({
          thisUser: this.state.user,
          saidYes: newThatUser.local.username
        }).then(res => {
          console.log("sent this,", res);
        }).catch(err => console.log(err))
      })
      
    }


    if (change === LEFT){
      API.signUp({
        thisUser: this.state.user,
        saidNo: newThatUser.local.username
      }).then(res => {
        console.log("sent this,", res);
      }).catch(err => console.log(err))
    }

    this.setState({
      thatUser: newThatUser,
      imageIdx: newIdx
    });
  }


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
          location={this.state.dogs[imageIdx].location}
          fixed={this.state.dogs[imageIdx].fixed}

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