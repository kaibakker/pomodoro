import React from 'react';



var TaskList = require('./TaskList')

import './../App.css';

import randomColor from 'randomcolor'


var tasks = JSON.parse(localStorage.getItem('tasks')) || [
  {label: 'Not active', color: 'red', logs: [{ startedAt: Date.now() }]},
  {label: 'Lunch', color: randomColor({luminosity: 'light'}), logs: []},
  {label: 'Break', color: randomColor({luminosity: 'light'}), logs: []},
];


var App = React.createClass({
  getInitialState() {
    return ({
      tasks: tasks,
    })
  },
  render() {
    return (<TaskList tasks={tasks}/>)
  }
})

module.exports = App;
