import React, {Component} from "react";
// import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
// import {Link} from "react-router-dom";
import {Col, Row, Container} from "../../components/Grid";
// import {List, ListItem} from "../../components/List";
import {Input, FormBtn} from "../../components/Form";
import Dropdown from "../../components/Dropdown";

class Dogs extends Component {

  state = {
    name: "",
    owner: "",
    photos: [],
    sex: "",
    places: [],
    fixed: "",
    vetDate: "",
    location: "",
    username:"",
    password:"",
    radius:""
  };

  componentDidMount() {
    this.loadDog();
  }

  loadDog = () => {
    API.getDogs()
      .then(res => this.setState({dogs: res.data, name: "", owner: "", sex: ""}))
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const {name, value} = event.target;
    this.setState({[name]: value});
  };
  // handleChange(date) {   this.setState({startDate: date}); }

  handleFormSubmit = event => {
    event.preventDefault();
    console.log(this.state);
    if (this.state.name && this.state.owner && this.state.sex) {
      API
        .saveDog({name: this.state.name, owner: this.state.owner, sex: this.state.sex, fixed: this.state.fixed})
        .then(res => this.loadDogs())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">

            <form>
              <Input
                value={this.state.username}
                onChange={this.handleInputChange}
                name="username"
                placeholder="Username (required)"/>
              <Input
                value={this.state.password}
                onChange={this.handleInputChange}
                name="password"
                type ="password"
                placeholder="Password(required)"/>

              <Input
                value={this.state.name}
                onChange={this.handleInputChange}
                name="name"
                placeholder="Name (required)"/>
              <Input
                value={this.state.owner}
                onChange={this.handleInputChange}
                name="owner"
                placeholder="Owner (required)"/>
              <Input
                value={this.state.location}
                onChange={this.handleInputChange}
                name="location"
                placeholder="Location(required)"/>
              
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
              < div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    name="places"
                    value="Park"
                    onChange={this.handleInputChange}/>Park</label>
              </div>
              <div className="form-group">
                <label>
                  <input
                    type="checkbox"
                    name="places"
                    value="Beach"
                    onChange={this.handleInputChange}/>
                  Beach
                </label>
              </div>
              <FormBtn
                disabled={!(this.state.name && this.state.owner && this.state.sex)}
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