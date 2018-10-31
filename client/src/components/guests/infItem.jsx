import React from 'react';
import { Row, Col } from 'react-flexbox-grid';

class InfItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = { 
      a: 0,
      minus: true,
      plus: false,
      colorSub: 'ButtonASOff',
      colorPlus: 'ButtonAddSub'
		}
	}
  onPlus(event){    

    this.setState({
      a: this.state.a + 1
    })
 
    if(this.state.minus){
      this.setState({
        minus: false,
        colorSub: 'ButtonAddSub'
      })
    }
  }


  onMinus(event){

    event.preventDefault();
    
    if(this.state.a===1){
      this.setState({
        minus: true,
        colorSub: 'ButtonASOff',
        a: this.state.a - 1
      })
    } else{    
      this.setState({
      a: this.state.a - 1
    })}
  }

  componentDidMount(){

  

  }

  componentDidUpdate() {

    // if(this.state.plus === false && this.props.guests === this.props.max ){
    //   this.setState({
    //     plus: true,
    //     colorPlus: 'ButtonASOff'
    //   })
    // } 
    // if(this.state.plus=== true && this.props.guests === this.props.max-1) {
    //   this.setState({
    //     plus: false,
    //     colorPlus: 'ButtonAddSub'
    //   })
    // }

    // if(this.props.person==='Adults' && this.state.a===1 && !this.state.minus){ //overriding Adults minus functionalities to stop when = 1
    //   console.log('turnOff')
    //   this.setState({
    //     minus: true,
    //     colorSub: 'ButtonASOff'
    //   })
    // }

  }

  render() {
    return (
        <Row className="GuestRow">
          <br/>
          <Col xsOffset={1} xs={2}>
            {this.props.person}
          </Col>
          <Col  xsOffset={3} xs={1}>
            <button className={`${this.state.colorSub}`} onClick={this.onMinus.bind(this)} disabled={this.state.minus}>
              <div className="AddSubFont"> - </div>
            </button>
          </Col>
          <Col xsOffset={1}  xs={1}>   {this.state.a}  </Col>
          <Col xsOffset={1} xs={1}>
            <button className={`${this.state.colorPlus}`} onClick={this.onPlus.bind(this)} disabled={this.state.plus}>
              <div className="AddSubFont"> + </div>
            </button>
          </Col>
        </Row>
    )
  }
}

export default InfItem;