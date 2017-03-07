import React, {Component} from 'react';

import {TextField, AutoComplete, SelectField, MenuItem, RaisedButton} from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class Pomodoro extends Component {
  state = {
    title: '',
    duration: 60
  }
  handleSubmit(event) {

  }
  handleDurationChange = (event, index, duration) => this.setState({duration});
  handleTitleChange = (title) => this.setState({title});
  render() {
    return (
      <MuiThemeProvider><div className='container'>
        <label>Working on</label>
        <h2>UX design <span className='pull-xs-right'>59m</span></h2>

        <AutoComplete dataSource={['hoi', 'hallo', 'hey']} floatingLabelText='What is your next task?' fullWidth={true} className='big' value={this.state.title} onUpdateInput={this.handleTitleChange} />

        <SelectField floatingLabelText="Frequency" value={this.state.duration} onChange={this.handleDurationChange} fullWidth={true}>
          <MenuItem value={15} primaryText="15m" />
          <MenuItem value={30} primaryText="30m" />
          <MenuItem value={45} primaryText="45m" />
          <MenuItem value={60} primaryText="1h" />
          <MenuItem value={120} primaryText="2h" />
          <MenuItem value={180} primaryText="3h" />
          <MenuItem value={240} primaryText="4h" />
          <MenuItem value={300} primaryText="5h" />
        </SelectField>
        <RaisedButton label="Start task" primary={true} />
      </div></MuiThemeProvider>
    )
  }
}


module.exports = Pomodoro;
