import React, { Component } from 'react';
import rpiLogo from '../../img/rpi-logo.png'
import HelpButton from '../helpButton/helpButton';
import './banner.css';

class Banner extends Component {
  render() {
    return (
      <div className="banner">
        <img src={rpiLogo} alt="Raspberry Pi logo"/>
        <span>{window.innerWidth<=768?"Raspberry Pi Simulator":"Raspberry Pi Azure IoT Online Simulator"}</span>
        <HelpButton 
          toggleHelpState = {this.props.toggleHelpState} />
      </div>
    );
  }
}

export default Banner;