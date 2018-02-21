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



class Dogs extends Component {
  constructor(){
    super()
    this.state = {
      user: null,
      dogName: "",
      owner: "",
      photos: [],
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
    axios.get('/auth/user')
      .then(res => {
        this.setState({ user: res.data.user.local.username }) 
        console.log("res.data", res.data);
        console.log("user here", this.state.user);
      })
      .catch(err => console.log(err));
  };

  placesChanged = (newPlaces) => {
    this.setState({places: newPlaces});
  }

  handleInputChange = event => {
    const {name, value} = event.target;
    this.setState({[name]: value});
  };
  // handleChange(date) {   this.setState({startDate: date}); }

  handleFormSubmit = event => {
    event.preventDefault();
    console.log(this.state);
    if (this.state.dogName && this.state.owner && this.state.sex) {
      axios
        .put('/auth/signup', {username: this.state.user, dogName: this.state.dogName, owner: this.state.owner, sex: this.state.sex, fixed: this.state.fixed, location: this.state.location})
        .then(res => {
          console.log(res)
          this.setState({ redirectTo: "/matches" });
        })
        .catch(err => console.log(err));
    }
  };

  render() {
    if(this.state.redirectTo){
      return <Redirect to={{ pathname: this.state.redirectTo }}/>
    }
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">

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
              <Input
                value={this.state.location}
                onChange={this.handleInputChange}
                name="location"
                placeholder="Location (required)"/>
              
<Dropdown  group isOpen = {this.state.dropdownOpen}size = "sm" toggle = {this.toggle} value = {this.select} name= "radius"> 
    
{/* <DropdownToggle caret>
  Dropdown 
</DropdownToggle> < DropdownMenu > ...</DropdownMenu> */}
             </Dropdown>



              < div className="form-group">
                <label>
                  <input type="radio" name="sex" onChange={this.handleInputChange} value="male"/>
                  Male
                </label>
              </div>
              <div className="form-group">
                <label>
                  <input
                    type="radio"
                    name="sex"
                    onChange={this.handleInputChange}
                    value="female"/>
                  Female
                </label>
              </div>

              <h3>Fixed?</h3>
              <div className="form-group">
                <label>
                  <input type="radio" name="fixed" value="yes" onChange={this.handleInputChange}/>
                  Yes
                </label>
              </div>
              <div className="form-group">
                <label>
                  <input type="radio" name="fixed" value="no" onChange={this.handleInputChange}/>
                  No
                </label>
              </div>
              <h3>
                Last Vaccine</h3>

              <div className="form-group">
                <input type="date" name="vetDate" onChange={this.handleInputChange}/>
              </div>

              <h3>Places</h3>
              <CheckboxGroup
                    checkboxDepth={2} // This is needed to optimize the checkbox group
                    name="places"
                    value={this.state.places}
                    onChange={this.placesChanged}>
                    <label><Checkbox value="park"/> Park</label>
                    <label><Checkbox value="beach"/> Beach</label>
                    <label><Checkbox value="indoors"/> Indoors</label>
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