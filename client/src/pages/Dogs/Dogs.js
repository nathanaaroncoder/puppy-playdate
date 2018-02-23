import React, {Component} from "react";
// import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
// import {Link} from "react-router-dom";
import {Col, Row, Container} from "../../components/Grid";
// import {List, ListItem} from "../../components/List";
import {Input, FormBtn} from "../../components/Form";
import Dropdown from "../../components/Dropdown";
import axios from 'axios';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
import {Redirect} from "react-router-dom"
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from 'react-places-autocomplete'
import Avatar from "../../components/UserProfile/Avatar";

class Dogs extends Component {
  constructor(props){
    super(props);
    this.onChange = (location) => {
      this.setState({location})
    };
    this.state = {
      user: null,
      dogName: "",
      owner: "",
      photo: "",
      sex: "",
      places: [],
      fixed: "",
      vetDate: "",
      location: "",
      radius:"",
      redirectTo: null
    }

    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
}
  componentDidMount() {
    this.loadUser();
  }

  loadUser = () => {
    // get the current user info and display on profile page
    axios.get('/auth/user')
      .then(res => {

        const userInfo = res.data.user
        this.setState({ 
          user: userInfo.local.username,
          photo: userInfo.photo,
          owner : userInfo.owner,
          image : userInfo.image,
          dogName: userInfo.dogName,
          location: userInfo.location,
          fixed: userInfo.fixed,
          sex: userInfo.sex,
          image: userInfo.image,
          places: userInfo.places,
          vetDate: userInfo.vetDate
        }) 
        console.log("res.data", res.data);
        console.log("user here", this.state.user);
      })
      .catch(err => console.log(err));
  };

  placesChanged = (newPlaces) => {
    console.log("newPlaces", newPlaces)
    this.setState({places: newPlaces});
  }

  handleInputChange = event => {
    const {name, value} = event.target;

    // it's logging so why isn't vetDate storing to db
    if (name=="vetDate"){
    console.log(value)
    console.log(typeof value)
}
    this.setState({[name]: value});

    // const placesArray = []
    // if (event.target.name =="places"){
    //   placesArray.push(event.target.value)
    //   this.setState({places: placesArray})
    // }
  };
  // handleChange(date) {   this.setState({startDate: date}); }

  handleFormSubmit = event => {
    event.preventDefault();
    console.log(this.state);

    // geocodeByAddress(this.state.location)
    // .then(results => getLatLng(results[0]))
    // .then(latLng => {
    //   this.setState({
    //     location: latLng
    //   });


      if (this.state.dogName && this.state.owner && this.state.sex) {

        console.log("this.state.vetDate in the put req", this.state.vetDate)
        console.log("this.state.places in the put req", this.state.places)
          axios //(need to add for photos)
            .put('/auth/signup', {username: this.state.user, dogName: this.state.dogName, owner: this.state.owner, sex: this.state.sex, fixed: this.state.fixed, location: this.state.location, places: this.state.places, vetDate: this.state.vetDate, radius: this.state.radius})
            .then(res => {
              console.log('axios then: ',res)
              this.setState({ redirectTo: "/matches" });
            })
            .catch(err => console.log('Axios err: ', err));
        }
    
      
      
    // })
    // .catch(error => console.error('Error', error))

  };

  render() {
    if(this.state.redirectTo){
      return <Redirect to={{ pathname: this.state.redirectTo }}/>
    }
    const inputProps = {
      value: this.state.location,
      onChange: this.onChange
    }    
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            {/* <label> */}
            <Avatar 
                  image={this.state.photo ? this.state.photo : "https://img0.etsystatic.com/034/0/6643643/il_570xN.619857698_8val.jpg"}
                  width={250}
                  height={250}
              />   
              {/* Profile Picture
            </label>         */}          

            <form>

              <Input
                value={this.state.dogName}
                onChange={this.handleInputChange}
                name="dogName"
                placeholder="Dog Name (required)"/>
              <Input
                value={this.state.owner}
                onChange={this.handleInputChange}
                name="owner"
                placeholder="Owner"/>
              {/* <Input
                value={this.state.location}
                onChange={this.handleInputChange}
                name="location"
                placeholder="Location (required)"/> */}
              <PlacesAutocomplete 
                inputProps={inputProps} 
                placeholder="Location"/>

              <Dropdown  
                group isOpen = {this.state.dropdownOpen}
                size = "sm" 
                toggle = {this.toggle} 
                value = {this.select} 
                name= "radius"> 
    
{/* <DropdownToggle caret>
  Dropdown 
</DropdownToggle> < DropdownMenu > ...</DropdownMenu> */}
             </Dropdown>



             <h3>Sex:</h3>
              <div className="form-group">
                <label>
                  <input type="radio" name="sex" checked={this.state.sex=="male"} onChange={this.handleInputChange} value="male"/>
                  Male
                </label>
              </div>
              <div className="form-group">
                <label>
                  <input
                    type="radio"
                    name="sex"
                    checked={this.state.sex=="female"}
                    onChange={this.handleInputChange}
                    value="female"/>
                  Female
                </label>
              </div>

              <h3>Fixed?</h3>
              <div className="form-group">
                <label>
                  <input type="radio" name="fixed" checked={this.state.fixed=="yes"} value="yes" onChange={this.handleInputChange}/>
                  Yes
                </label>
              </div>
              <div className="form-group">
                <label>
                  <input type="radio" name="fixed" checked={this.state.fixed=="no"} value="no" onChange={this.handleInputChange}/>
                  No
                </label>
              </div>
              <h3>
                Last Vaccine</h3>

              <div className="form-group">
                <input type="date" name="vetDate" value={this.state.vetDate} onChange={this.handleInputChange}/>
              </div>

              <h3>Places</h3>
              <CheckboxGroup
                    checkboxDepth={2} // This is needed to optimize the checkbox group
                    name="places"
                    value={this.state.places}
                    onChange={this.placesChanged}>
                    <label><Checkbox name="places"  value="park"/> Park</label>
                    <label><Checkbox name="places" value="beach"/> Beach</label>
                    <label><Checkbox name="places" value="indoors"/> Indoors</label>
              </CheckboxGroup>
              <FormBtn
                disabled={!(this.state.dogName && this.state.sex && this.state.location)}
                onClick={this.handleFormSubmit}>

                Submit Dog
              </FormBtn>
            </form>
          </Col>
        </Row>
      </Container >

    );
  }
}
export default Dogs;