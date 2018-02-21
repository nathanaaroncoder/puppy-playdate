import React, {Component} from "react";
import Calendar from "../../components/Calendar";
import axios from 'axios';
import {Col, Row, Container} from "../../components/Grid";
import {Redirect} from "react-router-dom";




class myCalendar extends Component {
    constructor(){
      super()
      this.state = {
        myEvent: null,
        redirectTo: null
      }
  }
    componentDidMount() {
      console.log("Calendar Loaded")
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
  

  

  

render() {
    if(this.state.redirectTo){
      return <Redirect to={{ pathname: this.state.redirectTo }}/>
    }
    return (
      <Container fluid>
        <Row>
          <Col size="sm-12">
            <Calendar/>
          </Col>
        </Row>
      </Container >

    );
  }

}
export default myCalendar;