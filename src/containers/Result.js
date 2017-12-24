import React, {Component} from 'react'

export default class Result  extends Component{
    constructor(props){
        super(props)
        this.state = {
            location: 'Jozi',
            geoLocation: 'Christie'
        }
    }

    render(){
        console.log(this.state);
        return(
            <div>
                Mutunda
            </div>
        )
    }
}