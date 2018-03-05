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
		console.log(this.props.country)
		console.log(this.props.city);
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
		var url = `https://api.weatherbit.io/v2.0/current/daily?&city=${this.props.city}&country=${this.props.country}&key=a052308100924167ab6441e67eea099f`;
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
		temp_c = temp_c;
		var conditions = parsed_json['data'][0]['weather']['description'];

		// set states for fields so they could be rendered later on
		this.setState({
			locate: location,
			temp: temp_c +"°",
			cond : conditions,
			advise: ('YOU SHOULD WEAR ' + this.towear(temp_c))
		});
	}


	towear(temp_c) {


		if(temp_c < 10 && temp_c >=-5){
			return ('SOME GLOVES');

		}
		if(temp_c< 20 && temp_c>=10){
			return 'A JACKET';
		}
		if(temp_c< 30 && temp_c>=20){
			return ' A PAIR OF SUNGLASSES';
		}

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
					<span class={ tempStyles }>{ this.state.temp }</span>
					<div class={ style.conditions }>{ this.state.cond }</div>
				</div>
				<div class={ style.details }></div>
				<div class={ style.description }>{ this.state.advise }</div>
				<div class = {style.home}>
					<Link href = {'/'} class={style.buttonleft}> </Link>
					<Link href = {'/extrainformation'} class ={style.buttoncenter}> </Link>
					<Link href = {'/locations'} class={style.buttonright}>  </Link>
				</div>
			</div>


		);
	}
}
