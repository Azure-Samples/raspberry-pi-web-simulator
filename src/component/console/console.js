import React, { Component } from 'react';
import Console from 'react-console-component';
import 'react-console-component/main.css';
import './console.css';

const welcomeMessage = 'Type `npm start` to run your app.\nWe don\'t support stop the app, so you may need referesh the page to kill your thread.\nWe keep your changes to the editor even you referesh the page. You can click the \'reset\' to reset the code';

class MyConsole extends Component {
  constructor(props) {
    super(props);
    this.echo = this.echo.bind(this);
    this.writeLine = this.writeLine.bind(this);
  }

  componentDidUpdate() {
    this.writeLine(this.props.message);
    this.writeLine(this.props.error);
  }

  writeLine(msg) {
    if (!msg) { return; }
    this.myConsole.acceptLine();
    this.myConsole.log(msg);
    this.myConsole.return();
  }

  echo(text) {
    if (text.trim() === 'npm start') {
      this.props.onStart();
    } else {
      this.myConsole.return();
    }
  }

  promptLabel() {
    return '> ';
  }

  render() {
    return (
      <div className={this.props.consoleHide ? 'hideConsole' : 'showConsole'}>
        <Console ref={(Console) => { this.myConsole = Console; } }
          handler={this.echo}
          promptLabel={this.promptLabel}
          value={this.props.error}
          autofocus={false}
          welcomeMessage={welcomeMessage}
          />
      </div>
    );
  }
}

export default MyConsole;
