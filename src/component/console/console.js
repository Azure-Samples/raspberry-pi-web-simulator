import React, { Component } from 'react';
import Console from 'react-console-component';
import 'react-console-component/main.css';
import './console.css';

var myConsole = null;
class MyConsole extends Component {
    echo(text) {
        console.log(text);
        myConsole.return();
    }

    promptLabel() {
        return 'pi@raspberrypi:~ $ ';
    }

    render() {
        return (
            <Console ref={(Console) => {myConsole = Console;}}
            handler={this.echo}
            promptLabel={this.promptLabel}
            autofocus={true}
            />
        );
    }
}

export default MyConsole;