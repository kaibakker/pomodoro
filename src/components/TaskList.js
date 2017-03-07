import React, {Component} from 'react';
// import {render} from 'react-dom';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

import Moment from 'react-moment';

import randomColor from 'randomcolor'



class Counter extends Component {
  render() {
    var counter = this.props.logs.map(function({startedAt, endedAt}) {
      if(endedAt) {
        return endedAt - startedAt
      } else {
        return (- startedAt)
      }
    }).reduce(function(a, b) { return a + b; }, 0)

    if(counter < 0) {
      return (
        <span className='pull-xs-right'>
          <Moment ago={true} fromNow>{ ((new Date(-counter)).toUTCString() ) }</Moment>
        </span>
      )
    } else {
      return (
        <span className='pull-xs-right'>
          <Moment ago={true} from={new Date()}>{ ((new Date(Date.now() - counter)).toUTCString() ) }</Moment>
        </span>
      )
    }
  }
}

const TaskElement = SortableElement(({item}) =>
  <li style={{backgroundColor: item.color}}>
    {item.label}
    <Counter logs={item.logs} />
    <a onClick={this}>archive</a>
  </li>
);

const TaskContainer = SortableContainer(({items}) =>
  <ul>
    {items.map((item, index) =>
        <TaskElement key={`item-${index}`} index={index} item={item}  />
    )}
  </ul>
);

var tasks = JSON.parse(localStorage.getItem('tasks')) || [
  {label: 'Not active', color: 'red', logs: [{ startedAt: Date.now() }], status: 'created' },
  {label: 'Lunch', color: randomColor({luminosity: 'light'}), logs: [], status: 'created' },
  {label: 'Break', color: randomColor({luminosity: 'light'}), logs: [], status: 'created' },
];


class TaskList extends Component {
    state = {
      items: tasks
    }
    shouldCancelStart = (e) => {
      if (['input', 'textarea', 'select', 'option', 'button'].indexOf(e.target.tagName.toLowerCase()) !== -1) {
				return true; // Return true to cancel sorting
      }
    }
    onSortEnd = ({oldIndex, newIndex}) => {
      var items = this.state.items

      if(oldIndex === 0) {
        items[0].logs[0].endedAt = Date.now()
        items[1].logs.unshift({ startedAt: Date.now() })
      } else if(newIndex === 0) {
        items[0].logs[0].endedAt = Date.now()
        items[oldIndex].logs.unshift({ startedAt: Date.now() })
      }

      var newItems = arrayMove(items, oldIndex, newIndex)

      this.setState({
          items: newItems
      });

      this.saveTasksToLocalStorage(newItems)
    };
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
          <TaskContainer items={this.state.items} onSortEnd={this.onSortEnd} shouldCancelStart={this.shouldCancelStart}/>

          <input type='text' onBlur={this.createTask} />
        </div>
      )
    }
}


module.exports = TaskList;
