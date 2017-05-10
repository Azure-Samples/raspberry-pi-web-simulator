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
    this.onReset = this.onReset.bind(this);
  }

  onReset() {
    this.refs.codeEditor.resetCode();
  }

  render() {
    return (
      <div className='display'>
        <div className='leftPanel'>
          <img src={this.props.turnOn ? turnOn : turnOff} alt='Raspberry PI'/>
        </div>
        <div className='rightPanel'>
          <Editor className='editor' readOnly={this.props.isRunning} ref='codeEditor'/>
          <ControlBar onStart={this.props.onStart} onReset={this.onReset} isRunning={this.props.isRunning}/>
          <Console message={this.props.consoleMsg} error={this.props.consoleErr} onStart={this.onStart}/>
        </div>
      </div>
    );
  }
}

export default Display;