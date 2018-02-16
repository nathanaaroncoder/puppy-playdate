import React from 'react';
import VetDate from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

// CSS Modules, react-datepicker-cssmodules.css import
// 'react-datepicker/dist/react-datepicker-cssmodules.css';

class Example extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            startDate: moment()
        };
        this.handleChange = this
            .handleChange
            .bind(this);
    }

    handleChange(date) {
        this.setState({startDate: date});
    }

   
}
export default Example;