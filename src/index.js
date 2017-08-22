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
import ErrorMap from './data/errorMap';
import { Route, Link, BrowserRouter } from 'react-router-dom';

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
        consoleMsgTimeStamp: null,
        consoleErrTimeStamp: null
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

  componentDidMount() {
      for(let key of Object.keys(Localization.localizedStringList)) {
        if(this.props.match.params.lang === key) {
            Localization.getLocalizedString().setLanguage(key);
            this.forceUpdate();
        }
      }
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
    this.setState(function () {
      return {
        console: {
          consoleMsg: message,
          consoleMsgTimeStamp: Date.now()
        }
      };
    });
  }
  onError(error) {
    let errorMap = ErrorMap.getInstance();
    if(errorMap.has(error)) {
        error = errorMap.get(error);
    }
    this.setState(function () {
      return {
        console: {
          consoleErr: error.message || JSON.stringify(error),
          consoleErrTimeStamp: Date.now()
        }
      };
    });
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
        reloadMain={this.forceUpdate.bind(this)}
        toggleHelpState = {this.toggleHelpState} />

        <Display
          consoleMsg={console.consoleMsg}
          consoleErr={console.consoleErr}
          consoleMsgTimeStamp = {console.consoleMsgTimeStamp}
          consoleErrTimeStamp = {console.consoleErrTimeStamp}
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
    <BrowserRouter>
        <Route path="/:lang?" component={Index} />
    </BrowserRouter>,  document.getElementById('root')
);