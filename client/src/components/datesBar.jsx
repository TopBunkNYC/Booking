import React from 'react';

import moment from 'moment';
import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';



class Dates extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
			startDate: moment()
		}

	}

	componentDidMount() {
	}
	render () {
		return (
		<div>
			
			
		

		</div>)
	}
}

export default Dates; 
