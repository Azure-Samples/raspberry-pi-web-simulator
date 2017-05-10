import React, { Component } from 'react';
import './controlBar.css';

class ControlBar extends Component {
  render() {
    return (
      <div className='controlBar'>
        <span onClick={this.props.onStart}>{this.props.isRunning ? 'Running' : 'Run'}</span>
        <span onClick={this.props.onReset}>Reset</span>
      </div>
    );
  }
}

export default ControlBar;