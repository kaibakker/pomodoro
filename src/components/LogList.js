import React, {Component} from 'react';
// import {render} from 'react-dom';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

import Moment from 'react-moment';

import randomColor from 'randomcolor'



class Log extends Component {
  render() {
    return (<div>
      {this.props.log.label}
      <span className='pull-xs-right'>
        <Moment ago={true} from={new Date(this.props.log.endedAt)}>{ new Date(this.props.log.startedAt) }</Moment>
      </span>
    </div>)
  }
}

var tasks = JSON.parse(localStorage.getItem('tasks')) || [
  {label: 'Not active', color: 'red', logs: [{ startedAt: Date.now() }], status: 'created' },
  {label: 'Lunch', color: randomColor({luminosity: 'light'}), logs: [], status: 'created' },
  {label: 'Break', color: randomColor({luminosity: 'light'}), logs: [], status: 'created' },
];

class LogList extends Component {
  extractLogs(tasks) {
    var logs = tasks.reduce(function(acc, val) {
      var labeledLogs = val.logs.map(function(log) {
        log.label = val.label
        return log
      });
      return acc.concat(val.logs)
    }, [])

    logs.sort(function (a, b) {
      return b.startedAt - a.startedAt;
    });

    return logs
  }
  render() {
    return (
      <ul>
        { this.extractLogs(tasks).map(function(log) {
          return <Log log={log} />
        }) }
      </ul>
    )
  }
}


module.exports = LogList;
