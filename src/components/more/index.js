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
		this.state.checker = false;

		// button display state

		this.fetchWeatherData();
		this.fetchMutipleDays();

	}

	/*componentDidMount(){
		this.setState({
			multData : this.state.multipleData.map(function(item,index){
				return(
					<li key={index} >item</li>
				);
			}),
			checker:true
		})
		console.log("Running");
	}*/

	// a call to fetch weather data via wunderground
	fetchWeatherData = () => {
		console.log("Function running");
		// API URL with a structure of : ttp://api.wunderground.com/api/key/feature/q/country-code/city.json
		var country = "UK";
		var city = "London";
		var url = `http://api.wunderground.com/api/14f9d8931618133f/conditions/q/${country}/${city}.json`;
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})

		// once the data grabbed, hide the button
	}

	parseResponse = (parsed_json) => {
		var location = parsed_json['current_observation']['display_location']['city'];
		var temp_c = parsed_json['current_observation']['temp_c'];
		temp_c = temp_c+"°C";
		var conditions = parsed_json['current_observation']['weather'];

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
		var i;
		var data = new Array();
		for(i=1; i<7; i++){
			data[i] = parsed_json['data'][i]['temp'];
			data[i] = data[i]+"°C";
			i++;
			data[i] = parsed_json['data'][i]['weather']['description'];
		}

		this.setState({
			multipleData:data,
		})

		for(i=1; i<7; i++){
			console.log(this.state.multipleData[i]);
		}

		this.setState({
			cond:this.state.multipleData[0]
		})

		console.log(this.state.cond);

	}

	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;
		console.log(this.state.multipleData);
		// display all weather data
		return (
			<div class={ style.container }>
					<div class={ style.header }>
					<div class={ style.city }>{ this.state.locate }</div>
					<div class={ style.conditions }>{ this.state.cond }</div>
					<span class={ tempStyles }>{ this.state.temp }</span>
				</div>
				<div class={ style.details }>
					{this.state.checker ? <ul>{multData}</ul> : null}
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
