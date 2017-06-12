import React, { Component } from 'react';
import './helpOverlay.css';
import closeButton from '../../img/closeButton.png';
import connectionStringInPortal from '../../img/connectionStringInPortal.png';

class HelpOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      pageNum: 4,
      pageClassNames: ["element-show","element-show","element-show","element-show"]
    }
  }
  nextPage = ()=>{
      this.setState((prev)=> {
          return {
            //   pageClassNames: tmpClassNames,
              page: prev.page+1
          }
      })
  }
  prevPage = ()=>{
      this.setState((prev)=> {
          return {
              page: prev.page-1
          }
      })
  }
  render() {
    return (
      <div className="overlay" style={{display: this.props.needShowHelp ? "flex" : "none"}}>
          <div className="row1">
            <a className="closeButton" href="#" onClick={this.props.toggleHelpState}>
                <img src={closeButton} width="40px" alt="close"/>
            </a>
          </div>
          <div className="row2">
            <a className={`help-prev ${ this.state.page == 0 ? 'element-hide' : ''}`} onClick={this.prevPage}>&lt;</a>
            <div className="instruction-container" style={{transform:"translate("+this.state.page*-100+"%,0)"}}>
            <div id="page0" className={`instruction element-show`}>
                    [LAYOUT INTRODUCE]In order to use simulator, you have to fill in IoT Hub device connection string in code editor<br/>
                    Open IoT Hub in Azure Portal, Click Device Explorer -> Choose a device (If there isn't device, create one) -> Copy connection string<br/>
                    Paste to code editor, replace '[Your IoT hub device connection string]'<br/>
                    <img src={connectionStringInPortal} width="950px" alt="get connection string from azure portal" />
            </div>
            <div id="page1" style={{left:"100%"}} className={`instruction element-show`}>
                    In order to use simulator, you have to fill in IoT Hub device connection string in code editor<br/>
                    Open IoT Hub in Azure Portal, Click Device Explorer -> Choose a device (If there isn't device, create one) -> Copy connection string<br/>
                    Paste to code editor, replace '[Your IoT hub device connection string]'<br/>
                    <img src={connectionStringInPortal} width="950px" alt="get connection string from azure portal" />
            </div>
            <div id="page2" style={{left:"200%"}} className={`instruction element-show`}>
                    In order to use simulator, you have to fill in IoT Hub device connection string in code editor<br/>
                    Open IoT Hub in Azure Portal, Click Device Explorer -> Choose a device (If there isn't device, create one) -> Copy connection string<br/>
                    Paste to code editor, replace '[Your IoT hub device connection string]'<br/>
                    <img src={connectionStringInPortal} width="950px" alt="get connection string from azure portal" />
            </div>
            <div id="page3" style={{left:"300%"}} className={`instruction element-show`}>
                    In order to use simulator, you have to fill in IoT Hub device connection string in code editor<br/>
                    Open IoT Hub in Azure Portal, Click Device Explorer -> Choose a device (If there isn't device, create one) -> Copy connection string<br/>
                    Paste to code editor, replace '[Your IoT hub device connection string]'<br/>
                    <img src={connectionStringInPortal} width="950px" alt="get connection string from azure portal" />
            </div>
            </div>
            <a className={`help-next ${ this.state.page == 3 ? 'element-hide' : ''}`} onClick={this.nextPage}>&gt;</a>
          </div>
          <div className="row3">
              <div className={`dot ${ this.state.page == 0 ? 'dot-selected' : ''}`} />
              <div className={`dot ${ this.state.page == 1 ? 'dot-selected' : ''}`} />
              <div className={`dot ${ this.state.page == 2 ? 'dot-selected' : ''}`} />
              <div className={`dot ${ this.state.page == 3 ? 'dot-selected' : ''}`} />
          </div>
      </div>
    );
  }
}

export default HelpOverlay;