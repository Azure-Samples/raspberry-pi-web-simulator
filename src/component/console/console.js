import React, { Component } from 'react';
import Console from 'react-console-component';
import 'react-console-component/main.css';
import './console.css';

const welcomeMessage = 'Click `Run` button to run the sample code(When sample is running, code is read-only).\nClick `Stop` button to stop the sample code running.\nClick `Reset` to reset the code.We keep your changes to the editor even you refresh the page.';

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
