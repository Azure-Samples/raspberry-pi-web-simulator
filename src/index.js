import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Banner from './component/banner/banner';
import Toolbar from './component/toolbar/toolbar';
import Display from './component/display/display';
import HelpOverlay from './component/helpOverlay/helpOverlay';
import Localization from './localization/localization';
import { traceEvent } from './lib/telemetry.js';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import Sample from './lib/sample.js';
import { tracePageView,tracePageViewAI } from './lib/telemetry.js';

class Index extends Component {
  constructor(props) {
    super(props);
    tracePageView();
    tracePageViewAI();
    this.state = {
      console: {
        consoleMsg: '',
        consoleErr: '',
      },
      LEDTurnOn: false,
      isRunning: false,
      showHelp: false
    }
    if (typeof(Storage) !== "undefined") {
        var disableHelp = localStorage.getItem("disable-help");
        if(disableHelp == null) {
            traceEvent('help-open-first');
            this.state.showHelp = true;
            localStorage.setItem("disable-help","true");
        }
    }
    this.runApp = this.runApp.bind(this);
    this.ledSwitch = this.ledSwitch.bind(this);
    this.onError = this.onError.bind(this);
    this.onMessage = this.onMessage.bind(this);
    this.onFinish = this.onFinish.bind(this);
  }

  runApp() {
    if (this.state.isRunning) { return; }

    var option = {
      onMessage: this.onMessage,
      onError: this.onError,
      ledSwitch: this.ledSwitch,
      turnOff: this.turnOff,
      onFinish: this.onFinish
    }

    this.setState(function () {
      return {
        isRunning: true,
        console: {}
      }
    });
    this.sample = new Sample();
    this.sample.run(option);
  }

  stopApp = () => {
    this.onMessage(Localization.getLocalizedString().consoleSampleStopped+ '.');
    this.sample.stop();
    this.onFinish();
  }

  onFinish() {
    this.setState(function () {
      return {
        isRunning: false
      }
    });
  }

  ledSwitch(isTurnOn) {
    this.setState(function () {
      return {
        LEDTurnOn: isTurnOn,
        console: {}
      };
    });
  }

  onMessage(message) {
    if(this.consoleCallback) {
        this.consoleCallback(message);
    }
  }
  onError(error) {
    if(this.consoleCallback) {
        this.consoleCallback(error);
    }
  }
  consoleRegisterCallback = (cb) => {
    this.consoleCallback = cb;
  }

  toggleHelpState = () => {
    this.setState((prev)=>{
        return {
            showHelp: !prev.showHelp
        }
    })
  }

  render() {
    const { console, LEDTurnOn, isRunning, showHelp } = this.state;
    return (
      <div className='main'>
        <Banner 
        toggleHelpState = {this.toggleHelpState} />
        {
          1 === 0 ? (<Toolbar onRunApp={this.runApp} />) : ('')
        }
        <Display
          consoleRegisterCallback={this.consoleRegisterCallback}
          onStart={this.runApp}
          onStop={this.stopApp}
          isRunning={isRunning}
          turnOn={LEDTurnOn} />
        
        <HelpOverlay
          needShowHelp = {showHelp}
          toggleHelpState = {this.toggleHelpState} />
      </div>
    );
  }
}

ReactDOM.render(
  <Index />,
  document.getElementById('root')
);