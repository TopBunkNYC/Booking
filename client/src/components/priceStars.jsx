import React from 'react';
import { Row, Col } from 'react-flexbox-grid';
import Ratings from 'react-ratings-declarative';

const PriceStars = (props)=>{
  //(Math.ceil((props.guests-1)*.5+1)*props.price)
  return (
		<div>
      <Row>
        <Col xs={2}>{`$${Math.round(props.guests*props.price*0.3)+props.price}   `}</Col>
        <Col xs={9} xsOffset={1}>{` per night`}</Col>
      </Row>

			<Ratings rating={props.rating} widgetDimensions="11px" widgetSpacings=".4px">
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

