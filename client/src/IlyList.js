import React, { Component } from 'react';
import moment from 'moment';
import './IlyList.css';

class IlyList extends Component {
  render() {
    const ilies = this.props.ilies.map(ily => {
      const displayTime = moment(ily.timestamp).format('M/D/YY h:mma');
      return (
        <div key={ily._id} className="row">
          <div className="timestamp">{displayTime}</div>
          <div className="note">{ily.note}</div>
        </div>
      );
    });

    return (
      <div className="IlyList">
        {ilies}
      </div>
    );
  }
}

export default IlyList;
