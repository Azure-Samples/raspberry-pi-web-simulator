import React, { Component } from 'react';
import Console from 'react-console-component';
import './controlBar.css';

class ControlBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      runButton: 'Run'
    }

    this.onStart = this.onStart.bind(this);
  }

  onStart() {
    var message = 'Running';
    if (this.state.runButton === message) {
      return;
    }
    this.setState(function () {
      return { runButton: message };
    });
    this.props.onStart();
  }

  render() {
    const { runButton } = this.state;
    return (
      <div className='controlBar'>
        <span onClick={this.onStart}>{runButton}</span>
        <span onClick={this.props.onReset}>Reset</span>
      </div>
    );
  }
}

export default ControlBar;