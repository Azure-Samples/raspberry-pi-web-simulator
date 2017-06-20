import React, { Component } from 'react';
import { traceEvent } from '../../lib/telemetry.js';
import './helpButton.css';
import helpPicture from '../../img/helpButton.png';

class HelpButton extends Component {
  onClick = () => {
      this.props.toggleHelpState();
      traceEvent('help-open');
  }
  
  render() {
    return (
      <a className='help' href="#" onClick={this.onClick}>
        Help
      </a>
    );
  }
}

export default HelpButton;