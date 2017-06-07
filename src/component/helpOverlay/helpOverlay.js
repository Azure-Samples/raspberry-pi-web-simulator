import React, { Component } from 'react';
import './helpOverlay.css';
import closeButton from '../../img/closeButton.png';
import connectionStringInPortal from '../../img/connectionStringInPortal.png';

class HelpOverlay extends Component {
  render() {
    return (
      <div className="overlay" style={{display: this.props.needShowHelp ? "block" : "none"}}>
          <a className="closeButton" href="#" onClick={this.props.toggleHelpState}>
              <img src={closeButton} width="40px" alt="close"/>
          </a>
          <div className="instruction">
                In order to use simulator, you have to fill in IoT Hub device connection string in code editor<br/>
                Open IoT Hub in Azure Portal, Click Device Explorer -> Choose a device (If there isn't device, create one) -> Copy connection string<br/>
                Paste to code editor, replace '[Your IoT hub device connection string]'<br/>
                <img src={connectionStringInPortal} width="950px" alt="get connection string from azure portal" />
          </div>
      </div>
    );
  }
}

export default HelpOverlay;