// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import $ from 'jquery';

export default class locationButton extends Component{

  placeSearchFunction = () =>{
    console.log("running");
    var input = document.getElementById('locationInput');
    input.innerHTML= "IUCRUFR";
    var autocomplete = new google.maps.places.Autocomplete(input);
  }

  render(){
    const API_KEY = 'AIzaSyDqkS2yb4SkbWCqUUowQOs5IFenHr4fkfE';
    return(
      <div>
        <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDqkS2yb4SkbWCqUUowQOs5IFenHr4fkfE&libraries=places&callback={this.placeSearchFunction}"></script>
        <form>
          <input type="text" id="locationInput" placeholder="Enter a city/country"/>
        </form>
      </div>
    );
  }
}
