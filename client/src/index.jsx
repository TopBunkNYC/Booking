import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import PriceStars from './components/priceStars.jsx';
import GuestsBar from './components/guests/guestsBar.jsx'

import moment from 'moment';
import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';




class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
			listToggle: "Toggle"
		}
		this.toggleList = this.toggleList.bind(this)
	}
	toggleList(event){
		event.preventDefault();
		console.log("toggle")
	}
	componentDidMount() {
		
		axios.get('/listing/id9873001')
		.then(({data}) => {
			console.log(data)
		})

	}

	render () {
		return (
		<div className="Master">
			<div>
				<PriceStars/>
				<DateRangePicker
					startDate={this.state.startDate} // momentPropTypes.momentObj or null,
					startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
					endDate={this.state.endDate} // momentPropTypes.momentObj or null,
					endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
					onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
					focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
					onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
				/>
				<div>
					<lable>Guests</lable>
					<button onClick={this.toggleList} className="Button" type="button">
					# guests	
					</button>
				</div>
				<GuestsBar visible={this.state.listToggle} /> 
			</div>
		</div>)
	}
}

ReactDOM.render(<App />, document.getElementById('app'));


