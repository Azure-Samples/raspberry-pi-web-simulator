import React, { Component } from 'react';
import Editor from '../editor/editor.js';
import Console from '../console/console.js'
import ControlBar from '../controlBar/controlBar.js';
import 'brace/mode/javascript';
import 'brace/theme/monokai';

import './display.css';
import '../../common.css'

import turnOn from '../../img/turnOn.png';
import turnOff from '../../img/turnOff.png';
// const turnOn = 'http://img.wxcha.com/file/201703/03/91b40f2cbc.jpg';
// const turnOff = 'http://www.peaceticket.com/img/static/e5/e5e6bc409a4201c5d9c3486718cabf70.jpg'

class Display extends Component {
  constructor(props) {
    super(props);
    this.state = {
      consoleHide : false
    }
    this.onReset = this.onReset.bind(this);
    this.toggleConsole = this.toggleConsole.bind(this);
  }

  toggleConsole() {
    const consoleHide = this.state.consoleHide;
    this.setState(function () {
      return {
        consoleHide: !consoleHide
      }
    });
  }

  onReset() {
    this.refs.codeEditor.resetCode();
  }

  render() {
    const { consoleHide } = this.state;
    return (
      <div className='display'>
        <div className='leftPanel'>
          <img style={{ display: this.props.turnOn ? 'block' : 'none'}} src={turnOn} alt='Raspberry PI'/>
          <img style={{ display: this.props.turnOn ? 'none' : 'block'}}  src={turnOff} alt='Raspberry PI'/>
        </div>
        <div className='rightPanel'>
          <div className='codeEditorTitle'>Code Editor</div>
          <Editor className='editor' readOnly={this.props.isRunning} consoleHide={consoleHide} ref='codeEditor'/>
          <ControlBar onStart={this.props.onStart} onReset={this.onReset} isRunning={this.props.isRunning} toggleConsole={this.toggleConsole} consoleHide={consoleHide}/>
          <Console consoleHide={consoleHide} message={this.props.consoleMsg} error={this.props.consoleErr} onStart={this.props.onStart}/>
        </div>
      </div>
    );
  }
}

export default Display;