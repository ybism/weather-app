// import preact
import { h, render, Component } from 'preact';
import {Router, Route, Link } from 'preact-router';

// import stylesheets for ipad & button
import style from './style_more';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';
import Location from '../location';


export default class more extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
		// temperature state
		this.state.temp = "";

		// button display state

		this.fetchWeatherData();
		this.fetchMutipleDays();

	}

	componentDidMount(){
		setInterval(
      () => this.updateBackground(),
      5000);
	}

	updateBackground = () => {
		var date = new Date();
		var currentHours;
		currentHours = date.getSeconds();
		if(currentHours<18&&currentHours>=9){
			//console.log("true");
			$("#container").css("background-image","url(../../assets/backgrounds/morningBackground.png)");
		}
		else{
			//console.log("false");
			//console.log(currentHours);
			$("#container").css("background-image","url(../../assets/backgrounds/eveningBackground.png)");
		}
	}

	// a call to fetch weather data via wunderground
	fetchWeatherData = () => {
		console.log("Function running");
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		var country = "UK";
		var city = "London";
		var url = `https://api.weatherbit.io/v2.0/current/daily?&city=London&country=UK&key=c1d7495b0d0040b889af53fd7aef17e2`;
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})

		// once the data grabbed, hide the button
	}

	parseResponse = (parsed_json) => {
		var location = parsed_json['data'][0]['city_name'];
		var temp_c = parsed_json['data'][0]['temp'];
		temp_c = temp_c+"°C";
		var conditions = parsed_json['data'][0]['weather']['description'];

		// set states for fields so they could be rendered later on
		this.setState({
			locate: location,
			temp: temp_c,
			cond : conditions
		});
	}


	fetchMutipleDays = () =>{
		console.log("Multiple function running");
		var apiurl = `https://api.weatherbit.io/v2.0/forecast/daily?&city=London&country=UK&key=c1d7495b0d0040b889af53fd7aef17e2`;
		$.ajax({
			url:apiurl,
			dataType:"jsonp",
			success: this.parseMultipleResponse,
			error : function(req, err){ console.log('Multiple API call failed ' + err); }
		})
	}

	parseMultipleResponse = (parsed_json) => {
		var temp1;
		var temp2;
		var temp3;

		var condition1;
		var condition2;
		var condition3;

		temp1 = parsed_json['data'][1]['temp'];
		temp1 = temp1+"°C";

		temp2 = parsed_json['data'][2]['temp'];
		temp2 = temp2+"°C";

		temp3 = parsed_json['data'][3]['temp'];
		temp3 = temp3+"°C";

		condition1 = parsed_json['data'][1]['weather']['description'];
		condition2 = parsed_json['data'][2]['weather']['description'];
		condition3 = parsed_json['data'][3]['weather']['description'];

		this.setState({
			tempDay1:temp1,
			tempDay2:temp2,
			tempDay3:temp3,
			conditionDay1:condition1,
			conditionDay2:condition2,
			conditionDay3:condition3
		});

		console.log(this.state.tempDay1);
		console.log(this.state.tempDay2);
		console.log(this.state.tempDay3);
		console.log(this.state.conditionDay1);
		console.log(this.state.conditionDay2);
		console.log(this.state.conditionDay3);
	}

	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;
		// display all weather data
		return (
			<div id = "container" class ={ style.container }>
					<div class={ style.header }>
					<div class={ style.city }>{ this.state.locate }</div>
					<div class={ style.conditions }>{ this.state.cond }</div>
					<span class={ tempStyles }>{ this.state.temp }</span>
				</div>
				<div class={ style.details }>
					<ul>
						<li>{this.state.tempDay1}</li>
						<li>{this.state.conditionDay1}</li>
						<li>{this.state.tempDay2}</li>
						<li>{this.state.conditionDay2}</li>
						<li>{this.state.tempDay3}</li>
						<li>{this.state.conditionDay3}</li>
					</ul>
				</div>
				<div class = {style.home}>
					<Link href = {'/'}> <img src = "../../assets/backgrounds/home.png" alt="home"/> </Link>
					<Link href = {'/extrainformation'}> <img src = "../../assets/backgrounds/more.png" alt="more"/> </Link>
					<Link href = {'/locations'}> <img src = "../../assets/backgrounds/location.png" alt="location"/> </Link>
				</div>
			</div>
		);
	}
}
