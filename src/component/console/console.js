import React, { Component } from 'react';
import Console from 'react-console-component';
import 'react-console-component/main.css';
import './console.css';

class MyConsole extends Component {
    constructor(props) {
        super(props);
        this.echo = this.echo.bind(this);
    }

    echo(text) {
        this.myConsole.return();
    }

    promptLabel() {
        return 'pi@raspberrypi:~ $ ';
    }

    render() {
        return (
            <Console ref={(Console) => {this.myConsole = Console;}}
            handler={this.echo}
            promptLabel={this.promptLabel}
            autofocus={true}
            />
        );
    }
}

export default MyConsole;