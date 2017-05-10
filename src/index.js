import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Banner from './component/banner/banner';
import Toolbar from './component/toolbar/toolbar';
import Display from './component/display/display';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import sample from './sample/sample.js'

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      consoleMsg: '',
      consoleErr: '',
      turnOn: false
    }
    this.runApp = this.runApp.bind(this);
    this.turnOff = this.turnOff.bind(this);
    this.turnOn = this.turnOn.bind(this);
  }

  runApp() {
    var onMessage = function (message) {
      this.setState(function () {
        return {
          consoleMsg: message,
          consoleErr: ''
        };
      });
    }.bind(this);
    var onError = function (error) {
      this.setState(function () {
        return {
          consoleMsg: '',
          consoleErr: error.message || JSON.stringify(error)
        };
      });
    }.bind(this);
    sample(onMessage, onError, {
      turnOn: this.turnOn,
      turnOff: this.turnOff
    });
  }

  turnOn() {
    this.setState(function () {
      return {
        turnOn: true,
        consoleErr: '',
        consoleMsg: ''
      }
    });
  }

  turnOff() {
    this.setState(function () {
      return {
        turnOn: false,
        consoleErr: '',
        consoleMsg: ''
      }
    });
  }

  render() {
    return (
      <div className='main'>
        <Banner />
        {
          1 === 0 ? (<Toolbar onRunApp={this.runApp}/>) : ('')
        }
        <Display consoleMsg={this.state.consoleMsg} consoleErr={this.state.consoleErr} onStart={this.runApp} turnOn={this.state.turnOn}/>
      </div>
    );
  }
}

ReactDOM.render(
  <Index />,
  document.getElementById('root')
);