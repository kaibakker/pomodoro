import React from 'react';

var TaskList = require('./TaskList')
var LogList = require('./LogList')
var PomodoroForm = require('./PomodoroForm')
var Pomodoro = require('./Pomodoro')


import { Router, Route, Link, browserHistory } from 'react-router'

import './../App.css';

import randomColor from 'randomcolor'


var App = React.createClass({
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/logs" component={LogList}/>
        <Route path="/pomodoro/new" component={PomodoroForm} />
        <Route path="/pomodoro" component={Pomodoro} />
        <Route path="/" component={TaskList}>
          <Route path="todo" component={TaskList}/>
        </Route>
      </Router>
    )
  }
})

module.exports = App;
