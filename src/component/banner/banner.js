import React, { Component } from 'react';
import rpiLogo from '../../img/rpi-logo.png'
import HelpButton from '../helpButton/helpButton';
import Language from '../language/language';
import Localization from '../../localization/localization';
import './banner.css';

class Banner extends Component {
  render() {
    return (
      <div className="banner">
        <img src={rpiLogo} alt={Localization.getLocalizedString().altRaspberryPiLogo}/>
        <span>{window.innerWidth<=768?Localization.getLocalizedString().pageTitleMobile:Localization.getLocalizedString().pageTitle}</span>
        <Language reloadMain={this.props.reloadMain} />
        <HelpButton 
          toggleHelpState = {this.props.toggleHelpState} />
      </div>
    );
  }
}

export default Banner;