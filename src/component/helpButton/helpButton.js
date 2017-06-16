import React, { Component } from 'react';
import './helpButton.css';
import helpPicture from '../../img/helpButton.png';

class HelpButton extends Component {

  render() {
    return (
      <a className='help' href="#" onClick={this.props.toggleHelpState}>
        Help
      </a>
    );
  }
}

export default HelpButton;