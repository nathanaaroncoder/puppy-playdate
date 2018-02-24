import React from 'react'
import { Modal, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import {Input, FormBtn} from "../../components/Form";
import axios from "axios";
import "./Modal.css";


class CalendarModal extends React.Component {
    constructor(props, context) {
      super(props, context);
  
      this.handleShow = this.handleShow.bind(this);
      this.handleClose = this.handleClose.bind(this);
  
      this.state = {
        show: false,
        user: null,
        pdName: "",
        pdLocation: "",
        pdDate: "",
        start: "",
        end: ""

      };
    }

    loadUser = () => {
      axios.get('/auth/user').then(response => {
        if (response.data.user) {
          this.setState({
            user: response.data.user.local.username
          })
        }
      })
    }
    
    componentDidMount() {
      this.loadUser();
    }
  
    handleClose() {
      this.setState({ show: false });
    }
  
    handleShow() {
      this.setState({ show: true });
    }

    handleInputChange = event => {
      const {name, value} = event.target;
      this.setState({[name]: value});
    }

    handleFormSubmit = event => {

      const playdate = {
        pdName: this.state.pdName, 
        pdLocation: this.state.pdLocation, 
        pdDate: this.state.pdDate, 
        start: this.state.start, 
        end: this.state.end 
      }

      event.preventDefault();
      console.log(this.state);
      this.handleClose();
      if (this.state.pdName && this.state.pdDate && this.state.start && this.state.end) {
        
          axios
            .put('/auth/signup', { username: this.state.user, playdate: playdate })
            .then(res => {
              console.log("res", res);
              window.location.reload();
            })
            .catch(err => console.log('Axios err: ', err));
        }
    }
  
    render() {
      // const popover = (
      //   <Popover id="modal-popover" title="popover">
      //     very popover. such engagement
      //   </Popover>
      // );
      // const tooltip = <Tooltip id="modal-tooltip">wow.</Tooltip>;
  
      return (
        <div>
  
          <Button bsStyle="success" bsSize="large" onClick={this.handleShow}>
            New Playdate
          </Button>
  
          <Modal id='calendar-modal' show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title><Input
                value={this.state.pdName}
                onChange={this.handleInputChange}
                name="pdName"
                placeholder="Who's your playdate with?"/></Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>

              <Input
                value={this.state.pdLocation}
                onChange={this.handleInputChange}
                name="pdLocation"
                placeholder="Where are you meeting?"/>


              <div className="form-group">
                 <input type="date" name="pdDate" value={this.state.pdDate} onChange={this.handleInputChange}/>
              </div>
              <div className="form-group">
                 <input type="time" name="start" value={this.state.start} onChange={this.handleInputChange}/>
              </div>
              <div className="form-group">
                 <input type="time" name="end" value={this.state.end} onChange={this.handleInputChange}/>
              </div>
            </form>
             
            </Modal.Body>
            <Modal.Footer>
              <FormBtn onClick={this.handleFormSubmit}>Save This Playdate</FormBtn>
            </Modal.Footer>
          </Modal>
        </div>
      );
    }
  }


  export default CalendarModal;