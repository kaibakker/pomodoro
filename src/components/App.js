import React from 'react';



var Player = require('./Player')
var TaskList = require('./TaskList')

import './../App.css';



var App = React.createClass({
  getInitialState() {
    return ({
      startedAt: null,
      logs: []
    })
  },
  start() {
    this.setState({ startedAt: Date.now() })
  },
  stop() {
    this.setState({
      startedAt: null,
    })
  },
  finish() {
    var logs = this.state.logs.slice()

    logs.unshift({
      startedAt: this.state.startedAt,
      endedAt: Date.now(),
      name: this.state.name,
    })

    this.setState({
      logs: logs,
      startedAt: null,
      name: ''
    })
  },
  completeCallback() {
    this.finish()
  },
  handleNameChange(e) {
    this.setState({ name: e.target.value })
  },
  render() {
    return (<TaskList />)
    return (
      <div className="container">
        <div className="App-header">
          <h2>Pomodoro timer</h2>
        </div>

        <div>
          <Player startedAt={ this.state.startedAt } completeCallback={ this.completeCallback }/>
        </div>

        <div className="input-group">
          <input type="text" className="form-control" value={ this.state.name } onChange={ this.handleNameChange } placeholder='What are you doing?' />
          <span className="input-group-btn">
            { this.state.startedAt &&
              <button className="btn btn-default" type="button" onClick={ this.finish }>finish Task</button>
            }
            { !this.state.startedAt &&
              <button className="btn btn-default" type="button" onClick={ this.start }>Start task</button>
            }
          </span>
        </div>



        <ul>
          { this.state.logs.map(function(log) {
            return <li>{log.name} { (log.endedAt - log.startedAt)/1000 }</li>
          })}
        </ul>
      </div>
    );
  }
})

module.exports = App;
