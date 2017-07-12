import React, { Component } from 'react';

class IlyList extends Component {
  render() {
    const ilies = this.props.ilies.map(ily => {
      return (
        <div key={ily._id}>
          <span className="timestamp">{ily.timestamp}</span>
          <span className="note">{ily.note}</span>
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
