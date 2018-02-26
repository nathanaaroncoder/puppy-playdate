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

    closeAndSave = () => {
      this.props.handleFormSubmit();
      this.handleClose();      
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
          <div className='text-center'>
          <Button id='modal-button' bsStyle="success" bsSize="medium" onClick={this.handleShow}>
            New Playdate
          </Button>
          </div>
  
          <Modal id='calendar-modal' show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title><Input
                value={this.props.pdName}
                onChange={this.props.handleInputChange}
                name="pdName"
                placeholder="Who's your playdate with?"/></Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>

              <Input
                value={this.props.pdLocation}
                onChange={this.props.handleInputChange}
                name="pdLocation"
                placeholder="Where are you meeting?"/>


              <div className="form-group">
                 <input type="date" name="pdDate" value={this.props.pdDate} onChange={this.props.handleInputChange}/>
              </div>
              <div className="form-group">
                 <input type="time" name="start" value={this.props.start} onChange={this.props.handleInputChange}/>
              </div>
              <div className="form-group">
                 <input type="time" name="end" value={this.props.end} onChange={this.props.handleInputChange}/>
              </div>
            </form>
             
            </Modal.Body>
            <Modal.Footer>
              <FormBtn onClick={this.closeAndSave}>Save This Playdate</FormBtn>
            </Modal.Footer>
          </Modal>
        </div>
      );
    }
  }


  export default CalendarModal;