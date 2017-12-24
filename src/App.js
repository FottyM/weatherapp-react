import React, { Component } from 'react';
import {connect}from 'react-redux'
import './App.css';
import Result from './containers/Result';
import { findByLocation, updateLocationName } from './actions/weatherAction'
import weatherReducer from "./reducers/weatherReducer";



class App extends Component {

    handleSubmit(e){
      e.preventDefault();
      const location = this.props.location;
      debugger
      this.props.findByLocation(location)

    }



    handleChange(e){
      let location =  e.target.value
        console.log(location)
      this.props.updateLocationName(location);
    }


  render() {
        const {location} = this.props.location;
    return (
      <div className="App">
          <form onSubmit={ (e) => this.handleSubmit(e) }>
              <input type="text" name="location" value={ location } onChange={ (e) => this.handleChange(e) }/>
              <button type="submit"> fetch </button>
          </form>
      </div>
    );
  }
}

const mapStateToProps = (state) =>{
    return{
        ...state.weatherReducer
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        findByLocation(location){
            dispatch(findByLocation(location))
        },
        updateLocationName(location){
            dispatch(updateLocationName(location))
        }
    }

}


export default connect(mapStateToProps, mapDispatchToProps)(App);



