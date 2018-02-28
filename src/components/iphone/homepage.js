// import preact
import { h, render, Component } from 'preact';
import {Router, Route, Link } from 'preact-router';

// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';
import Location from '../location';
import More from '../more';



export default class home extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
		// temperature state
		this.state.temp = "";
		// button display state
		this.setState({ display: true });

		this.fetchWeatherData();


		//var date = new Date();
		//console.log(date.getHours());
		//var locationImageVar;
	}

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
		console.log(this.state.display);
		this.setState({ display: false });
		console.log(this.state.display);
	}

	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;
		// display all weather data
		return (
			<div class={ style.container }>
					<div class={ style.header }>
					<div class={ style.city }>{ this.state.locate }</div>
					<div class={ style.conditions }>{ this.state.cond }</div>
					<span class={ tempStyles }>{ this.state.temp }</span>
				</div>
				<div class={ style.details }></div>
				<div class = {style.home}>
					<Link href = {'/'}> <img src = "../../assets/backgrounds/home.png" alt="home"/> </Link>
					<Link href = {'/extrainformation'} > <img src = "../../assets/backgrounds/more.png" alt="more"/> </Link>
					<Link href = {'/locations'}> <img src = "../../assets/backgrounds/location.png" alt="location"/> </Link>
				</div>
			</div>
		);
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
}
