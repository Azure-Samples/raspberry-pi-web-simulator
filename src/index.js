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
      consoleErr: ''
    }
    this.runApp = this.runApp.bind(this);
  }

  runApp(connStr) {
    var onMessage = function (message) {
      this.setState(function () {
        return { consoleMsg: message };
      });
    }.bind(this);
    var onError = function (error) {
      this.setState(function () {
        return { consoleErr: error.message || JSON.stringify(error) };
      });
    }.bind(this);
    sample(connStr, onMessage, onError);
  }
  render() {
    return (
      <div className='main'>
        <Banner />
        <Toolbar onRunApp={this.runApp}/>
        <Display className='display' consoleMsg={this.state.consoleMsg} consoleErr={this.state.consoleErr}/>
      </div>
    );
  }
}


ReactDOM.render(
  <Index />,
  document.getElementById('root')
);