import React, { Component } from 'react';
import {Glyphicon} from 'react-bootstrap';
import './controlBar.css';

class ControlBar extends Component {
  render() {
    return (
      <div className='controlBar' onMouseEnter={this.props.changeHintPart.bind(this,3)}>
        <div className="localOverlay" style={{opacity: this.props.needShowHelp ? "1" : "0",zIndex: this.props.needShowHelp ? "5" : "-1"}}/>
        <span onClick={this.props.onStart}>{this.props.isRunning ? 'Running' : 'Run'}</span>
        <span onClick={this.props.onReset}>Reset</span>
        <span className='rightBtn' onClick={this.props.toggleConsole}><Glyphicon glyph={this.props.consoleHide ? 'chevron-up' : 'chevron-down'} /></span>
      </div>
    );
  }
}

export default ControlBar;