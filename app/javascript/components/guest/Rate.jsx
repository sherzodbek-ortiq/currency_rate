import React from "react"
import { ActionCable } from 'react-actioncable-provider';
import { API_ROOT } from '../custom_components';
import'bootstrap/dist/css/bootstrap.min.css';
import'bootstrap/dist/js/bootstrap.bundle.min';

class Rate extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      rub: ""
    };

    this.handleReceivedRate = this.handleReceivedRate.bind(this)
  }

  componentDidMount = () => {
    fetch(`${API_ROOT}/api/v1/rates`)
    .then((res) => res.json())
    .then((res) => {
    	this.setState({
    		rub: res.rub
    	});
    });
  };

  handleReceivedRate = (res) => {
    this.setState({
    	rub: res.rub
    });
  };

	render(){
    return (
    	<div className="">
     		<ActionCable
     		  channel={{ channel: 'RatesChannel' }}
     		  onReceived={this.handleReceivedRate}
     		/>
        <div className="text-center mt-5"><h1>1 USD =  {this.state.rub} RUB</h1></div>
    	</div>
    );
	}
}

export default Rate
