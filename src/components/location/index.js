import { h, render, Component } from 'preact';
import {Router, Route, Link } from 'preact-router';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

import style from './style';
import style_iphone from '../button/style_iphone';

// import stylesheets for ipad & button
import $ from 'jquery';

export default class locationButton extends Component{
  constructor(props) {
      super(props)
      //this.state = { address: 'San Francisco, CA' }
      this.onChange = (address) => this.setState({ address })
    }

    handleFormSubmit = (event) => {
      event.preventDefault()
      console.log(this.state.address);
      geocodeByAddress(this.state.address)
        .then(results => getLatLng(results[0]))
        .then(latLng => console.log('Success', latLng))
        .catch(error => console.error('Error', error))
    }

    render() {
      const inputProps = {
        value: this.state.address,
        onChange: this.onChange
      }
      return(
    			<div id="container" class ={ style.container }>
    					<div class={ style.search}>CHOOSE YOUR LOCATION</div>
              <div class={ style.header}>
                <form onSubmit={this.handleFormSubmit}>
                  <PlacesAutocomplete inputProps={inputProps} />
                  <button type="submit" class={style.button}></button>
                </form>
    			    </div>
              <div class = {style.home}>
                <Link href = {'/'} class={style.buttonleft}> </Link>
                <Link href = {'/extrainformation'} class={style.buttoncenter}> </Link>
                <Link href = {'/locations'} class={style.buttonright}>  </Link>
    			    </div>
    			</div>
        );
    }
}
