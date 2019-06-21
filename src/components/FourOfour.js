import React from 'react';
import { withRouter } from 'react-router-dom';
import '../style/App.css';

const FourOFour = ({ history }) => (
  <div className="home-container">
    <div>
      <button
        type="button"
        style={{
          width: 100,
          height: 40,
          backgroundColor: 'red',
          opacity: '.7',
          borderRadius: 400
        }}
        onClick={() => history.push('/')}
      >
        HOME
      </button>
    </div>
    <div>
      <h1> Four-O-Four </h1>
    </div>
    <div />
  </div>
);

export default withRouter(FourOFour);
