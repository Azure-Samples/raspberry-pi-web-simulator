import React, { Component } from 'react';
import './helpButton.css';
import helpPicture from '../../img/helpButton.png';

class HelpButton extends Component {

  render() {
    return (
      <a className='help' href="#" onClick={this.props.toggleHelpState}>
        <img src={helpPicture} alt="Help me" width="100px"/>
      </a>
    );
  }
}

export default HelpButton;