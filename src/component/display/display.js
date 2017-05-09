import React, { Component } from 'react';
import Editor from '../editor/editor.js';
import Console from '../console/console.js'
import ControlBar from '../controlBar/controlBar.js';
import 'brace/mode/javascript';
import 'brace/theme/monokai';

import './display.css';
import '../../common.css'

class Display extends Component {
  constructor(props) {
    super(props);
    this.state = {
      readOnly: false
    };
    this.onStart = this.onStart.bind(this);
    this.onReset = this.onReset.bind(this);
  }
  onStart() {
    this.setState(function () {
      return { readOnly: true };
    });
    this.props.onStart();
  }

  onReset() {
    this.refs.codeEditor.resetCode();
  }

  render() {
    return (
      <div className='display'>
        <div className='leftPanel'>
          <img src='https://docs.microsoft.com/en-us/azure/iot-hub/media/iot-hub-raspberry-pi-kit-node-get-started/3_raspberry-pi-sensor-connection.png' alt='Raspberry PI'/>
        </div>
        <div className='rightPanel'>
          <Editor className='editor' readOnly={this.state.readOnly} ref='codeEditor'/>
          <ControlBar onStart={this.onStart} onReset={this.onReset}/>
          <Console message={this.props.consoleMsg} error={this.props.consoleErr} onStart={this.onStart}/>
        </div>
      </div>
    );
  }
}

export default Display;