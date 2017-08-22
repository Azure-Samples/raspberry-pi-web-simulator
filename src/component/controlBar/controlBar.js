import React, { Component } from 'react';
import {Glyphicon} from 'react-bootstrap';
import './controlBar.css';
import Localization from '../../localization/localization';

class ControlBar extends Component {
  render() {
    return (
      <div className='controlBar'>
        <span onClick={this.props.isRunning ? this.props.onStop : this.props.onStart}>{this.props.isRunning ?  Localization.getLocalizedString().buttonStop : Localization.getLocalizedString().buttonRun}</span>
        <span className={`${this.props.isRunning && 'reset-disable'}`} onClick={!this.props.isRunning && this.props.onReset}>{Localization.getLocalizedString().buttonReset}</span>
        <span className='rightBtn' onClick={this.props.toggleConsole}><Glyphicon glyph={this.props.consoleHide ? 'chevron-up' : 'chevron-down'} /></span>
      </div>
    );
  }
}

export default ControlBar;