import React, { Component } from 'react';
import {Glyphicon} from 'react-bootstrap';
import '../../common.css'
import './toolbar.css';

class Banner extends Component {
  constructor(props) {
    super(props);
    this.CONNECTION_STRING_PROMPT = 'Your Azure IoT hub device connection string'
    this.state = {
      connStr: '',
      downloadLink: 'https://github.com/Azure-Samples/iot-hub-node-raspberrypi-client-app/archive/master.zip'
    }
    this.runApp = this.runApp.bind(this);
    this.connStrHandler = this.connStrHandler.bind(this);

  };

  runApp() {
    this.props.onRunApp(this.state.connStr);
  };

  connStrHandler(event) {
    this.setState({
      connStr: event.target.value
    });
  }

  render() {
    const {CONN_STR, DOWNLOAD_LINK} = this.state;
    return (
      <div className='toolbar'>
        <div className='leftPanel'>
          <span className='tool'><Glyphicon glyph='folder-open'/>Open Samples</span>
          <span className='tool' onClick={this.runApp}><Glyphicon glyph='play'/>Run app</span>
          <span className='tool'><a href={DOWNLOAD_LINK }><Glyphicon glyph='download-alt'/>Download</a></span>
          <span className='tool'><Glyphicon glyph='share-alt'/>Share</span>
        </div>
        <div className='rightPanel connStrInputPanel'>
          <input id='connStrInput' type='text' name='connStr' value={CONN_STR} onChange={this.connStrHandler} placeholder={this.CONNECTION_STRING_PROMPT}/>
        </div>
      </div>
    );
  }
}

export default Banner;