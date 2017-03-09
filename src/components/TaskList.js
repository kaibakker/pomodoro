import React, {Component} from 'react';
// import {render} from 'react-dom';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

import Moment from 'react-moment';

import randomColor from 'randomcolor'

var tasks = [
  {label: 'Not active', color: 'red', logs: [{ startedAt: new Date().setHours(12), endedAt: new Date().setHours(14) }], status: 'created' },
  {label: 'Lunch', color: randomColor({luminosity: 'light'}), logs: [{ startedAt: new Date().setHours(15), endedAt: new Date().setHours(16) }], status: 'created' },
  {label: 'Break', color: randomColor({luminosity: 'light'}), logs: [{ startedAt: new Date().setHours(17), endedAt: new Date().setHours(19) }], status: 'created' },
];

class Task extends Component {
  render() {
    var date = new Date()
    date.setTime(this.props.task.logs[0].endedAt)
    return (
      <div style={{ height: (this.props.task.logs[0].endedAt - this.props.task.logs[0].startedAt)/(90*1000)}}>
        { date.toTimeString() }
      </div>
    )
  }
}


class TaskList extends Component {
    state = {
      items: tasks
    }
    shouldCancelStart = (e) => {
      if (['input', 'textarea', 'select', 'option', 'button'].indexOf(e.target.tagName.toLowerCase()) !== -1) {
				return true; // Return true to cancel sorting
      }
    }
    createTask = (event) => {
      var items = this.state.items
      items.push({ label: event.target.value, color: randomColor({ luminosity: 'light' }), logs: []})
      this.setState({ items: items });

      this.saveTasksToLocalStorage(items)
    };
    saveTasksToLocalStorage = (items) => {
      localStorage.setItem("tasks", JSON.stringify(items))
    }
    render() {
      return (
        <div>
          { this.state.items.map(function(task) {
            return <Task task={task} />
          }) }

          <input type='text' onBlur={this.createTask} />
        </div>
      )
    }
}


module.exports = TaskList;
