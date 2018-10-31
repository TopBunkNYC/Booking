import React from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';


const Total = (props)=>{

  return (
		<div className="Total">
        <Row> 
					<Col xs={6}> {props.guests*props.price}x N nights </Col>
					<Col xs={2} xsOffset={3} className="TotalAlign">{`$${props.guests*props.price}`}</Col>
				</Row>
				<Row> 
					<Col  xs={6}>Cleaning fee</Col>
					<Col xs={2} xsOffset={3} className="TotalAlign">$35</Col>
				</Row>
				<Row>
					<Col  xs={6}>Service fee</Col>
					<Col xs={2} xsOffset={3} className="TotalAlign">$55</Col>
				</Row>
				<Row>
					<Col  xs={6}>Total</Col>
					<Col xs={2} xsOffset={3}  className="TotalAlign"> $T </Col>
				</Row>
		</div>
  )
}

export default Total;