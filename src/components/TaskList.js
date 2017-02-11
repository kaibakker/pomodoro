import React, {Component} from 'react';
import {render} from 'react-dom';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

import randomColor from 'randomcolor'

const TaskElement = SortableElement(({item}) => <li style={{backgroundColor: item.color}}>{item.label}</li>);

const TaskContainer = SortableContainer(({items}) => {
    return (
        <ul>
            {items.map((item, index) =>
                <TaskElement key={`item-${index}`} index={index} item={item} />
            )}
        </ul>
    );
});
var tasks = [
  {label: 'Not active', color: 'red'},
  {label: 'Lunch', color: randomColor()},
  // {label: 'Upcoming:', color: '#fff'},
  {label: 'Break', color: randomColor()},
  {label: 'Working on UX design			', color: randomColor()},
  {label: 'Finish this review!', color: randomColor()},
  // {label: 'Common:', color: '#fff'},
  {label: 'Sinterklaas', color: randomColor()},
  // {label: 'Done:', color: '#fff'},
  {label: 'Get #1 google ranking', color: randomColor()},
  {label: 'Update to-do list article', color: randomColor()}
];
class TaskList extends Component {

    state = {
        items: tasks

    }
    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState({
            items: arrayMove(this.state.items, oldIndex, newIndex)
        });
    };
    render() {
        return (
            <TaskContainer items={this.state.items} onSortEnd={this.onSortEnd} />
        )
    }
}


module.exports = TaskList;
