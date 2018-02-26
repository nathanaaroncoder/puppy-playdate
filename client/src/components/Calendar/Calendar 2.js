import React from 'react'
import BigCalendar from 'react-big-calendar'
import events from './events'
import moment from 'moment'
import BigCalendarCSS from 'react-big-calendar/lib/css/react-big-calendar.css';
import "./Calendar.css";

moment.locale('en-GB');

BigCalendar.momentLocalizer(moment);

let allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k])

let MyCalendar = () => (
  <BigCalendar
    events={events}
    views={allViews}
    step={60}
    showMultiDayTimes
    defaultDate={new Date(2018, 2, 1)}
  />
)

export default MyCalendar