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
	constructor(){
		super();
		this.state.country = "UK";
		this.state.city = "London";
	}

	changeLocation = (newCountry, newCity) =>{
		this.setState({
			country:newCountry,
			city:newCity,
		});
	}


	render() {
		return (
			<Router history = {browserHistory}>
				<Route path="/" component={() => <Home country={this.state.country} city={this.state.city}/> }/>
				<Route path="/locations" component={() => <Location country={this.state.country} city={this.state.city} changeLocation = {this.changeLocation}/> }/>
				<Route path="/extrainformation" component={() => <More country={this.state.country} city={this.state.city}/>} />
			</Router>
		);
	}
}
