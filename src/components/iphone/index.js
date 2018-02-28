// import preact
import { h, render, Component } from 'preact';
import {Router, Route, Link, browserHistory} from 'preact-router';

// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';
import Location from '../location';
import Home from './homepage';
import More from '../more';

export default class Iphone extends Component {
//var Iphone = React.createClass({

	// a call to fetch weather data via wunderground

	/*var mainFunction = () =>{
		render(){
			return(
				const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;
				<div class={ style.container }>
						<div class={ style.header }>
						<div class={ style.city }>{ this.state.locate }</div>
						<div class={ style.conditions }>{ this.state.cond }</div>
						<span class={ tempStyles }>{ this.state.temp }</span>
					</div>
					<div class={ style.details }></div>
					<div class= { style_iphone.container }>
						{ this.state.display ? <Button class={ style_iphone.button } clickFunction={ this.fetchWeatherData }/ > : null }
					</div>
					<div class = {style.home}>
						<img src = "../../assets/backgrounds/home.png" alt="home"/>
						<img src = "../../assets/backgrounds/more.png" alt="more"/>
						<img src = "../../assets/backgrounds/location.png" alt="location"/>
					</div>
				</div>
			);
		}
	}*/

	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page

		// display all weather data
		return (
			<Router history = {browserHistory}>
				<Route path={'/'} component={Home}></Route>
				<Route path={'/locations'} component={Location}></Route>
				<Route path={'/extrainformation'} component={More}></Route>
			</Router>
		);
	}
}
