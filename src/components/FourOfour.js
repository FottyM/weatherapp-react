import React from 'react';
import { func } from 'prop-types';
import '../style/App.css';

const FourOFour = props => {
  const goBack = () => {
    props.goBack();
  };

  return (
    <div className="home-container">
      <div>
        <button type="button" onClick={goBack}>
          back
        </button>
      </div>
      <div>
        <h1> Four-O-Four </h1>
      </div>
    </div>
  );
};

FourOFour.propTypes = {
  goBack: func.isRequired
};

export default FourOFour;
