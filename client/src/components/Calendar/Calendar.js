import React from 'react'
import BigCalendar from 'react-big-calendar'
import setEvents from './events'
import moment from 'moment'
import BigCalendarCSS from 'react-big-calendar/lib/css/react-big-calendar.css';
import "./Calendar.css";
import CalendarModal from "../Modal"
import { loadavg } from 'os';
import axios from 'axios';

moment.locale('en-GB');
const current = moment();
console.log("current moment", current);

BigCalendar.momentLocalizer(moment);

let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

class MyCalendar extends React.Component {
  constructor(props, context){
    super(props, context);

    // this.handleShow = this.handleShow.bind(this);
    // this.handleClose = this.handleClose.bind(this);

    this.state = {
      events: setEvents,
      user: null,
      pdName: "",
      pdLocation: "",
      pdDate: "",
      start: "",
      end: ""
    }
  }
  componentDidMount() {
      this.loadPlaydates();
  }

  // handleShow() {
  //   this.setState({ show: true });
  // }

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

    // event.preventDefault();
    console.log(this.state);
    // this.handleClose();
    if (this.state.pdName && this.state.pdDate && this.state.start && this.state.end) {
      
        axios
          .put('/auth/signup', { username: this.state.user, playdate: playdate })
          .then(res => {
            console.log("res", res);
            this.loadPlaydates();
            this.resetInput();
          })
          .catch(err => console.log('Axios err: ', err));
      }
  }

  resetInput = () => {
    this.setState({ pdName: "" });
    this.setState({ pdLocation: "" });
    this.setState({ pdDate: "" });
    this.setState({ start: "" });
    this.setState({ end: "" });
  }

  loadPlaydates = () => {
    // doing a get request for the user's info
      axios.get('/auth/user')
      .then(res => {
        // sets the state to the current user
        this.setState({ user: res.data.user.local.username });
        // creates an empty array to be populated later with all of the user's
        // playdates in the db
        const playdates = [];
        console.log("res.data.user.playdates", res.data.user.playdates);
        // looping through each playdate
        res.data.user.playdates.forEach((playdate, i) => {
          // we need to reformat the date from a hypenated string to numbers in an array
          let date = playdate.pdDate.split("-");
          // create the empty array to be populated by the numbers
          let numberDate = [];
          date = date.forEach(number => numberDate.push(parseInt(number)));
          // for some reason the new Date needs to take in the month as one number
          // below (it seems as though January is at the 0th place)
          const month = numberDate[1] - 1;
          // replacing the original month number with the correct
          numberDate.splice(1, 1, month);
          console.log("playdate.start", playdate.start);
          // split up the times to used as arrays of numbers
          let startTime = playdate.start.split(":")
          // each new Date moment needs both seconds and milliseconds
          startTime.push("0", "0");
          console.log("startTime after pushes", startTime);
          let numberStart = [];
          // actually converts the strings to numbers and pushes to array
          startTime.forEach(number => {
            const integer = parseInt(number);
            numberStart.push(integer);
          });
          let endTime = playdate.end.split(":")
          endTime.push("0", "0");
          let numberEnd = [];
          // does the same as line 58, but takes out the integer const 
          endTime.forEach(number => numberEnd.push(parseInt(number)));
          
          console.log("After both pushes --------")
          console.log("date", numberDate);
          console.log("startTime", numberStart);
          console.log("endTime", numberEnd);
          // the final array for start and finish times need to be seven integers,
          // so we push the date and time together as one for both
          const formatStart = numberDate.concat(numberStart);
          console.log("full formatStart", formatStart);
          const formatEnd = numberDate.concat(numberEnd);
          console.log("full formatEnd", formatEnd);
          
          // create the final formatted playdate
          const formatPlaydate = {
            id: i + 1,
            title: `Playdate with ${playdate.pdName} at ${playdate.pdLocation}`,
            // the start and end times use the six numbers from their respective
            // arrays (could this get looped through for drier code?)
            start: new Date (formatStart[0], formatStart[1], formatStart[2], formatStart[3], formatStart[4], formatStart[5]),
            end: new Date (formatEnd[0], formatEnd[1], formatEnd[2], formatEnd[3], formatEnd[4], formatEnd[5])
            
          }
          // finally push them all into the empty playdates array
          playdates.push(formatPlaydate);
        })

        console.log("playdates", playdates);
        // set the state to the newly populated playdates 
        this.setState({ events: playdates });

        console.log("res.data", res.data);
        console.log("user here", this.state.user);
      })
      .catch(err => console.log(err));
  }



render(){ 
  return( 
      <div>
        <CalendarModal 
        handleFormSubmit={this.handleFormSubmit}
        pdName={this.state.pdName}
        handleInputChange={this.handleInputChange}
        pdLocation={this.state.pdLocation}
        pdDate={this.state.pdDate}
        start={this.state.start}
        end={this.state.end}
        />

        <BigCalendar
        events={this.state.events}
        views={allViews}
        step={60}
        showMultiDayTimes
        defaultDate={new Date(2018, 2, 1)}
      />
    </div>
  )
}

}

export default MyCalendar