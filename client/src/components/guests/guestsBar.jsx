import React from 'react';
// import './guestBar.css';




class GuestsBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
	
		}
	}

	componentDidMount() {
	}
	render () {
		return (
			<div className={`${this.props.visible}`}>
				<div>Adults</div>
				<div>Children</div>
				<div>Infants</div>
			</div>)
	}
}

export default GuestsBar; 



{/* <div className='button-wrapper select-guests-wrapper'>
	<button className='button ven-book-select-guests' type='button'
		onClick={ this.props.toggleSelectGuests }
		>{ this.state.guestCount } guests
		<img src={ window.staticImages.select_guest_arrow } />
	</button>
</div> */}

{/* <div> className='dropdown-wrapper'
			<div> className='dropdown'> 
								className='dropdown-option'  */}

// 								.dropdown {
// 									position: relative;   missing relative
// 									margin-bottom: -16px;
// 									top: -16px;
// 									font-weight: 300 !important;
// 									border: 1px solid #dce0e0;
// 									border-top: 0;
// 									background-color: #fff;
// 								};

		
// .dropdown .dropdown-option {
//   border-radius: 4px;
//   padding: 12px 24px;
// }

// .dropdown .dropdown-option:hover {
//   background-color: #f7f7f7;
// }
