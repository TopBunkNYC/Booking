import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import PriceStars from './components/priceStars.jsx';
import GuestsBar from './components/guests/guestsBar.jsx'
import { Grid, Row, Col } from 'react-flexbox-grid';
// import moment from 'moment'; 
import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import Total from './components/total.jsx';


class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
			listToggle: "ToggleStart",
			arrowImg: "down",
			guests: 0,
			max: 0,
			minStay: 0,
			numRatings: 0,
			price: 0,
			stars: 0,
			apartmentid: 0,
			dates: [],
			bookedDates: 0
		}
		this.toggleList = this.toggleList.bind(this)
	}
	toggleList(event){
		event.preventDefault();
		//console.log("pre toggle", this.state.listToggle)
		if(this.state.listToggle === "ToggleStart"){
			this.setState({listToggle: "ToggleOn", arrowImg: "up"})
		} else{
			this.setState({listToggle: "ToggleStart", arrowImg: "down"})
		}		
		
	}

	increaseGuests(){
		//event.preventDefault();
		console.log("add")

		this.setState({
			guests: this.state.guests + 1
		});
	}
	decreaseGuests(event){
		event.preventDefault();
		this.setState({
			guests: this.state.guests -1
		});
	}

	componentDidMount() {

		let queryString = window.location;
		let listingId = (queryString.search.slice(-7) * 1)

		apartmentid: 9873003
		dates: (2) ["2018/12/10", "2018/12/12"]
		max: 5
		minStay: 3
		numRatings: 125
		price: 120
		stars: 4.95
		
		axios.get(`/listing/id${listingId}`)
		.then(({data}) => {
			this.setState(data)
		}).catch((err)=>{
		})

	}

	render () {
		return (
		<div className="Master">
			
			<Grid fluid>
				<Row><PriceStars price={this.state.price} guests={this.state.guests} rating={this.state.stars}/></Row>
					Dates
				<Row>
					<DateRangePicker	startDate={this.state.startDate} // momentPropTypes.momentObj or null,
										startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
										endDate={this.state.endDate} // momentPropTypes.momentObj or null,
										endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
										onDatesChange={({ startDate, endDate }) =>{console.log(startDate); this.setState({ startDate, endDate })}} // PropTypes.func.isRequired,
										focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
										onFocusChange={focusedInput => this.setState({ focusedInput })} 
										minimumNights={this.state.minStay}/>
				</Row>
				<br/>
				Guests
				<Row>
						<button onClick={this.toggleList} className="Button" type="button">
							<Row >
								<Col  xs={6}  >
									{`${this.state.guests} `} 
									{(this.state.guests>1)? ("guests"): ("guest")}
									
								</Col>
								<Col  xs={2} xsOffset={4}>  
									<img src={require(`../dist/images/${this.state.arrowImg}-arrow.png`)} height='20px' width='20px' />				
								</Col>
							</Row>
						</button>
					
				</Row>
				<Row>
					<Col ><GuestsBar guests={this.state.guests} inf={this.state.infants} max={this.state.max} visible={this.state.listToggle} add={this.increaseGuests.bind(this)} minus={this.decreaseGuests.bind(this)}/></Col>	
				</Row>
				{(this.state.guests===this.state.max)?(<Total guests={this.state.guests} price={this.state.price}/>):(<br/>)}
				<br/>
				<Row>
					<button className="ButtonBook" type="button">
					<Row center="xs" >
						<Col  xs={3} className="BookButtonFont">Book</Col>
					</Row>
					</button>
				</Row>
			</Grid>
		</div>)
	}
}

ReactDOM.render(<App />, document.getElementById('app'));


