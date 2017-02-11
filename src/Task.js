import React, { Component } from 'react';




var Player = React.createClass({
  render() {
    if(this.props.active == null) {
      return (
        <h1>stopped</h1>
      )
    } else {
      return (
        <div>
          <h1>{ this.props.active.title }</h1>
          <CountdownTimer initialTimeRemaining={ this.props.active.interval } completeCallback={ this.props.completeCallback }/>
        </div>
      )
    }
  }
})



var App = React.createClass({
  updateActive() {
    // get current time
    //
  },
  getInitialState() {
    return ({
      status: 'stop',
      active: null,
      queue: [],
      schema: [
      	{
      		type: 'pomodoro',
      		title: 'pomodoro',
      		interval: 25*60*1000
      	},
      	{
      		type: 'shortbreak',
          title: 'shortbreak',
      		interval: 25*60*1000
      	},
      	{
      		type: 'pomodoro',
      		title: 'pomodoro',
      		interval: 5*2000
      	},
      	{
      		type: 'break',
          title: 'break',
      		interval: 15*1000
      	}
      ]
    })
  },
  start() {
    if(this.state.active) {
      this.setState({
        status: 'start'
      })
    } else {
      this.setState({
        status: 'start',
        active: this.state.schema[0]
      })
    }
  },
  stop() {
    this.setState({
      status: 'stop',
      active: null
    })
  },
  pause() {
    this.setState({
      status: 'pause'
    })
  },
  completeCallback() {
    this.setState({
      status: 'start',
      active: this.state.schema[1]
    })
  },
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>{ this.state.status }</h2>
        </div>
        <Player active={ this.state.active } completeCallback={ this.completeCallback }/>

        <a onClick={ this.start }>start</a>
        <a onClick={ this.stop }>stop</a>
        <a onClick={ this.pause }>pause</a>
      </div>
    );
  }
})

export default App;
