import React, { Component } from 'react';
import {Glyphicon} from 'react-bootstrap';
import './controlBar.css';

class ControlBar extends Component {
  render() {
    return (
      <div className='controlBar'>
        <span onClick={this.props.onStart}>{this.props.isRunning ? 'Running' : 'Run'}</span>
        <span onClick={this.props.onReset}>Reset</span>
        <span className='rightBtn' onClick={this.props.toggleConsole}><Glyphicon glyph={this.props.consoleHide ? 'chevron-up' : 'chevron-down'} /></span>
      </div>
    );
  }
}

export default ControlBar;