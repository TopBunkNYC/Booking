import React from 'react';

import Ratings from 'react-ratings-declarative';

// const starsModel = (props) => {
//   return (
//     <Ratings rating={props.rating} widgetDimensions="40px" widgetSpacings="5px">
//       <Ratings.Widget widgetRatedColor="#008489" />
//       <Ratings.Widget widgetRatedColor="#008489" />
//       <Ratings.Widget widgetRatedColor="#008489" />
//       <Ratings.Widget widgetRatedColor="#008489" />
//       <Ratings.Widget widgetRatedColor="#008489" />
//     </Ratings>
//   )
// };


const PriceStars = (props)=>{

  return (
		<div>
			<h3>${props.price*props.guests} per night</h3>
			<Ratings rating={props.rating} widgetDimensions="15px" widgetSpacings="2px">
			   <Ratings.Widget widgetRatedColor="#008489" />
         <Ratings.Widget widgetRatedColor="#008489" />
         <Ratings.Widget widgetRatedColor="#008489" />
         <Ratings.Widget widgetRatedColor="#008489" />
         <Ratings.Widget widgetRatedColor="#008489" />
			</Ratings>
		</div>
  )
}

export default PriceStars;

