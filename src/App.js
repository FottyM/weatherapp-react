import React, { Component } from 'react';
import {connect}from 'react-redux'
import './App.css';
// import DayForecast from './components/DayForecast';
import Results from './containers/Result'
import { findByLocation, updateLocationName, findByGeoLocation } from './actions/weatherAction'


class App extends Component {

    handleSubmit(e){
      e.preventDefault();
      const location = this.props.location;
      this.props.findByLocation(location)

    }

    handleChange(e){
      let location =  e.target.value
        console.log(location)
      this.props.updateLocationName(location);
    }

    handleClick(){
        console.log('Clicked')
        this.props.findByGeoLocation();
    }


  render() {
      // this.props.findByGeoLocation();
        const {location} = this.props.location;
        console.log(this.props)


    return (
        <div>
            <div>
            <form onSubmit={ (e) => this.handleSubmit(e) }>
            <input type="text" name="location" value={ location } onChange={ (e) => this.handleChange(e) }/>
            <p>use my </p> <span onClick={ () => this.handleClick() }>current position </span>
            <button type="submit"> fetch </button>
            </form>
            </div>

            <Results celcius={this.props.dataForGivenLocation} fahrenheit={this.props.dataForGivenLocationF}/>
        </div>

    );
  }
}



const mapStateToProps = (state) =>{
    return{
        ...state.weatherReducer,
        turns: true
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        findByLocation(location){
            dispatch(findByLocation(location))
        },
        updateLocationName(location){
            dispatch(updateLocationName(location))
        },
        findByGeoLocation(){
            dispatch(findByGeoLocation())
        }
    }

}


export default connect(mapStateToProps, mapDispatchToProps)(App);



