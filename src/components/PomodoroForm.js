import React, {Component} from 'react';

class PomodoroForm extends Component {
  state = {
    title: '',
    duration: '1h'
  }
  handleTitleChange(event) {
    this.setState({ title: event.target.value })
  }
  handleDurationChange(event) {
    this.setState({ title: event.target.value })
  }
  handleSubmit(event) {

  }
  render() {
    return (
      <div>
        <p>What are you going to do?</p>
        <input type='text' value={this.state.title} onChange={this.handleTitleChange}/>
        <p>How much time do you heed?</p>
        <input type='text' value={this.state.duration} onChange={this.handleDurationChange}/>
        <a className='btn' onClick={this.handleSubmit}>start task</a>
      </div>
    )
  }
}


module.exports = PomodoroForm;
