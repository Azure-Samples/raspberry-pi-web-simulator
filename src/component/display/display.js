import React, { Component } from 'react';
import AceEditor from 'react-ace';
import Console from '../console/console.js'
import 'brace/mode/javascript';
import 'brace/theme/monokai';

import {index} from '../../data/index.js';

import './display.css';
import '../../common.css'

class Display extends Component {
    constructor(props) {
        super(props);
        this.state = {
            indexFile: index()
        }
    }

    render() {
        return (
            <div>
                <div className='leftPanel'>
                    <img src='https://docs.microsoft.com/en-us/azure/iot-hub/media/iot-hub-raspberry-pi-kit-node-get-started/3_raspberry-pi-sensor-connection.png' alt='Raspberry PI'/>
                </div>
                <div className='rightPanel'>
                    <AceEditor
                        mode='javascript'
                        theme='monokai'
                        name='codeEditor'
                        className='codeEditor'
                        width='100%'
                        showPrintMargin={false}
                        tabSize={2}
                        defaultValue={this.state.indexFile}
                        value={this.state.indexFile}
                        readOnly={true}
                        />
                    <Console message={this.props.consoleMsg} error={this.props.consoleErr}/>
                </div>
            </div>
        );
    }
}

export default Display;