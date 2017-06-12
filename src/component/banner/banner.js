import React, { Component } from 'react';
import rpiLogo from '../../img/rpi-logo.png'
import './banner.css';
import HelpButton from '../helpButton/helpButton';

class Banner extends Component {
  render() {
    return (
      <div className="banner">
        <img src={rpiLogo} alt="Raspberry Pi logo"/>
        <span>Raspberry Pi Azure IoT Online Simulator</span>
        <HelpButton 
          toggleHelpState={this.props.toggleHelpState} />
      </div>
    );
  }
}

export default Banner;