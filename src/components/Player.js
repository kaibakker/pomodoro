import React from 'react';

var CountdownTimer = require('./CountdownTimer')

var Player = React.createClass({

  render() {
    if(this.props.startedAt == null) {
      return (
        <p>Not started</p>
      )
    } else {
      return (
        <p>
          Pomodoro started:
          { <CountdownTimer initialTimeRemaining={ 30*1000 - Date.now() + this.props.startedAt } completeCallback={ this.props.completeCallback }/> }
        </p>
      )
    }
  }
})

module.exports = Player;
