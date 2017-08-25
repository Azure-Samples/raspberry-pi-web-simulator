import React, { Component } from 'react';
import Console from 'react-console-component';
import 'react-console-component/main.css';
import './console.css';
import Localization from '../../localization/localization';

class MyConsole extends Component {
  constructor(props) {
    super(props);
    this.echo = this.echo.bind(this);
    this.writeLine = this.writeLine.bind(this);
  }

  componentDidUpdate(prevProps) {
    if(this.props.messageTimeStamp !== prevProps.messageTimeStamp) {
      this.writeLine(this.props.message);
    }
    if(this.props.errorTimeStamp !== prevProps.errorTimeStamp) {
      this.writeLine(this.props.error);
    }
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
          welcomeMessage={Localization.getLocalizedString().consoleWelcomeMessage}
          />
      </div>
    );
  }
}

export default MyConsole;
