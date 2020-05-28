import React from "react"
import DateTimePicker from 'react-datetime-picker';
import'bootstrap/dist/css/bootstrap.min.css';
import'bootstrap/dist/js/bootstrap.bundle.min';

class AdminPanel extends React.Component {

  constructor(props){
    super(props);
    this.state = {
	    date: new Date(),
	    fixed_rate: "",
	    until_time: "",
	    rates:[],
	    error: ""
    };

    this.onDateChange = this.onDateChange.bind(this)
    this.onChange = this.onChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.prependRate = this.prependRate.bind(this);
    this.showError = this.showError.bind(this);

  }

	componentDidMount(){
		fetch("/api/v1/all_rates.json", {
			method: "GET"
		})
		.then(response => response.json())
		.then( (response) => {
			this.setState({ rates: response });
		});
	}

  onDateChange = date => {
 		this.setState({ date: date })
 		console.log(date)
  }

  onChange = event => {
		const name = event.target.name
		this.setState({
			[name]: event.target.value
		});
  }

	prependRate(rate){
		let rates = this.state.rates
		rates.unshift(rate)
  	this.setState({
  	  rates: rates
  	});
	}

	showError(error){
  	this.setState({
  	  error: error
  	});
	}

	handleSubmit(event){
		event.preventDefault();
		const rate_form = event.target;
		const date = this.state.date;
		const until_time = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDay() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
		this.setState({until_time: until_time});

		fetch('/api/v1/rates', {
		  method: 'POST',
		  headers: {
		    'Accept': 'application/json',
		    'Content-Type': 'application/json',
		  },
		  body: JSON.stringify({
		  	rate: {
		  	  fixed_rate: this.state.fixed_rate,
		  	  until_time: until_time
		  	}
		  })
		})
		.then((response) => response.json())
		.then((responseJson) => {
			if(!("errors" in responseJson)){
			  this.prependRate({
			  	id: responseJson.id,
			  	fixed_rate: this.state.fixed_rate,
			  	until_time: this.state.until_time
			  })
				this.showError("")
			}else{
				this.showError("Error has occured")
			}
		})
		.catch((error) => {
  		console.error(error);
  	})
	}
 
  render() {

		var rates = this.state.rates
		rates.sort((a, b) => a.id < b.id)
		rates = rates.map((rate) =>{
			return(
				<div key={rate.id}>
					fixed_rate: {rate.fixed_rate}, until_time: {rate.until_time}
				</div>
			)
		});

    return (
      <div className="container pt-3 text-center">
				<form className="row" onSubmit={this.handleSubmit}>
					<div className="form-group col-xs-12 col-sm-12 col-md-6 col-lg-6 .text-danger" >{this.state.error}</div>
					<div className="form-group col-xs-12 col-sm-12 col-md-6 col-lg-6" >
						<h4>Select date</h4>
		        <DateTimePicker
		          onChange={this.onDateChange}
		          value={this.state.date}
		        />
					</div>
					<h4>Enter fixed rate</h4>
					<input className="form-group col-xs-12 col-sm-12 col-md-6 col-lg-6" type="text" name="fixed_rate" value={this.state.fixed_rate} onChange={this.onChange} placeholder="Enter the fixed rate" />
					<div className="col-12 text-center p-3">
						<button type="submit" className="btn btn-primary">Submit</button>
					</div>

				</form>
				<h4>History</h4>
				{ rates }
      </div>
    );
  }

}

export default AdminPanel
