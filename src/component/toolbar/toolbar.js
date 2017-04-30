import React, { Component } from 'react';
import {Glyphicon} from 'react-bootstrap';
import AlertContainer from 'react-alert';
import '../../common.css'
import './toolbar.css';
import IotHub from '../../lib/azure/iot-hub.js';

class Banner extends Component {
    constructor(props) {
        super(props);
        this.CONNECTION_STRING_PROMPT = 'Your Azure IoT hub device connection string'
        this.state = {
            downloadLink : 'https://github.com/Azure-Samples/iot-hub-node-raspberrypi-client-app/archive/master.zip'
       }
       this.connect = this.connect.bind(this);
    
    };

    connect (connstr) {
        try {
            this.hub = this.hub || new IotHub(connstr);
            this.hub.connect();
        } catch (error) {
            console.error(error);
        }
    };

    render() {
        const {DOWNLOAD_LINK} = this.state;
        return (
            <div className='toolbar'>
                <div className='leftPanel'>
                    <span className='tool'><Glyphicon glyph='folder-open'/>Open Samples</span>
                    <span className='tool' onClick={this.connect}><Glyphicon glyph='play'/>Run app</span>
                    <span className='tool'><a href={DOWNLOAD_LINK }><Glyphicon glyph='download-alt'/>Download</a></span>
                    <span className='tool'><Glyphicon glyph='share-alt'/>Share</span>
                </div>
                <div className='rightPanel connStrInputPanel'>
                    <input id='connStrInput' type='text' name='connStr' placeholder={this.CONNECTION_STRING_PROMPT}/>
                </div>
            </div>
        );
    }
}

export default Banner;