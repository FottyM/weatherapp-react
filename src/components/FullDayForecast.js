import PropTypes from 'prop-types';
import React from 'react';

const FullDayForecast = props => {
  const { data, setSymbol } = props;

  return (
    <table>
      <tbody>
        <tr>
          <td className="title">Morning</td>
          <td>{`${data[3].morn} ${setSymbol}`}</td>
        </tr>
        <tr>
          <td className="title">Day</td>
          <td>{`${data[0].day} ${setSymbol}`}</td>
        </tr>
        <tr>
          <td className="title">Evening</td>
          <td>{`${data[2].eve} ${setSymbol}`}</td>
        </tr>
        <tr>
          <td className="title">Night</td>
          <td>{`${data[1].night} ${setSymbol}`}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default FullDayForecast;

FullDayForecast.propTypes = {
  data: PropTypes.array.isRequired,
  setSymbol: PropTypes.string.isRequired
};
