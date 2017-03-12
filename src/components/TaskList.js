import React, {Component} from 'react';

import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

import Moment from 'react-moment';

import randomColor from 'randomcolor'

var tasks = [
  {label: 'Not active', color: 'red', logs: [{ startedAt: new Date().setHours(12), endedAt: new Date().setHours(14) }], status: 'created' },
  {label: 'Lunch', color: randomColor({luminosity: 'light'}), logs: [{ startedAt: new Date().setHours(15), endedAt: new Date().setHours(16) }], status: 'created' },
  {label: 'Break', color: randomColor({luminosity: 'light'}), logs: [{ startedAt: new Date().setHours(17), endedAt: new Date().setHours(19) }], status: 'created' },
  {label: 'Paperbak', color: randomColor({luminosity: 'light'}), logs: [{ startedAt: new Date().setHours(19), endedAt: new Date().setHours(20) }], status: 'created' },
];


var start = new Date(Date.now());
start.setHours(0,0,0,0);
start = start.getTime()
var scale = 1000*60*2


class Task extends Component {
  render() {
    var top = (this.props.task.logs[0].startedAt - start)/scale
    var height = (this.props.task.logs[0].endedAt - this.props.task.logs[0].startedAt)/scale
    return (
      <div style={{ top: top, height: height}} className='slot'>
        { this.props.task.label }
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

      this.saveTasksToLocalStorage(items);

    };
    saveTasksToLocalStorage = (items) => {
      localStorage.setItem("tasks", JSON.stringify(items))
    };
    onMouseDown = (e) => {
      var positionY = e.clientY;
      this.setState({status: 'start', start: positionY})
    };
    onMouseMove = (e) => {
      if(this.state.status == 'start') {
        var positionY = e.clientY;
        this.setState({end: positionY})
      }
    }
    onMouseUp = (e) => {
      this.setState({status: 'end'})
      // this.setState({start: 0, end: 0})

    }
    handleSave = (e) => {
      e.preventDefault();
      var startedAt = start + this.state.start*scale
      var endedAt = start + this.state.end*scale

      var items = this.state.items
      items.push({ label: e.target.value, color: randomColor({ luminosity: 'light' }), logs: [{startedAt: startedAt, endedAt:endedAt}]})
      this.setState({ items: items, status: 'end' });

      this.saveTasksToLocalStorage(items);
    }
    render() {
      var top = (Date.now() - start)/scale

      return (
        <div className="relative" onMouseUp={this.onMouseUp} onMouseMove={this.onMouseMove} onMouseDown={this.onMouseDown}>
          { this.state.items.map(function(task) {
            return <Task task={task} />
          }) }

          <div style={{ top: this.state.start, height: this.state.end - this.state.start}} className='slot'>
            <input value='new task' onBlur={this.handleSave}/>
            <a>cancel</a>
            <a onClick={this.handleSave}>save</a>
          </div>

          <div style={{ top: top}} className="slotnow">now</div>
        </div>
      )
    }
}


module.exports = TaskList;
