import React, { Component } from 'react';
import Console from 'react-console-component';
import 'react-console-component/main.css';
import './console.css';

const welcomeMessage = 'Type `npm start` to run your app\nCurrently, we only allow run once, but you can freely refresh the page since we keep your change';

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
      <Console ref={(Console) => { this.myConsole = Console; } }
        handler={this.echo}
        promptLabel={this.promptLabel}
        value={this.props.error}
        welcomeMessage={welcomeMessage}
        />
    );
  }
}

export default MyConsole;
