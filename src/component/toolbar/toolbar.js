import React, { Component } from 'react';
import {Glyphicon} from 'react-bootstrap';
import '../../common.css'
import './toolbar.css';

class Banner extends Component {
    constructor(props) {
        super(props);
        this.CONNECTION_STRING_PROMPT = 'Your Azure IoT hub device connection string';
        this.DOWNLOAD_LINK = 'https://github.com/Azure-Samples/iot-hub-node-raspberrypi-client-app/archive/master.zip';
    }

    render() {
        return (
            <div className='toolbar'>
                <div className='leftPanel'>
                    <span className='tool'><Glyphicon glyph='folder-open'/>Open Samples</span>
                    <span className='tool'><Glyphicon glyph='play'/>Run app</span>
                    <span className='tool'><a href={this.DOWNLOAD_LINK }><Glyphicon glyph='download-alt'/>Download</a></span>
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