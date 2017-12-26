import React, {Component} from 'react'
import '../style/Result.css'

export default class Result  extends Component{

    renderSevenDaysForecast(i){
        return (
            <div key={i}>
                <p>Tue</p>
                <p>Logo</p>
                <p>Temp</p>
            </div>
        );
    }

    render(){
        let days = Array(7).fill('');
        console.log(this.props)

        return(
            <div className="container">
                <div className="header"> back Tallinn </div>
                <div className="switch">switch</div>
                <div className="date-day">
                    <p>Tuesday, December 26th 2017</p>
                    <p>Light snow</p>
                </div>
                <div className="big-temp">
                    32 F
                </div>
                <div className="big-icon">Cloud</div>
                <div className="daily-forecast">
                    <ul>
                        <li>Mon 40</li>
                        <li>Day 39</li>
                        <li>Eve 32</li>
                        <li>Night 29</li>
                    </ul>
                </div>
                <div className="days-forecast">
                    { days.map( (el, index) => this.renderSevenDaysForecast(index))}
                </div>
            </div>
        )
    }
}