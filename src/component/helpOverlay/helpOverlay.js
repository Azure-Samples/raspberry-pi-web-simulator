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
    }
  }
  nextPage = ()=>{
      this.setState((prev)=> {
          return {
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
  componentWillReceiveProps = (nextProps)=> {
      if(this.props.needShowHelp !== nextProps.needShowHelp) {
          this.setState(()=> {
          return {
              page: 0
          }
      })
      }
  }
  render() {
    return (
      <div className="overlay" style={{display: this.props.needShowHelp ? "flex" : "none",zIndex: this.state.page == 0 ? "-1" : "5",backgroundColor:this.state.page == 0 ? "rgba(0,0,0,0)" : "rgba(0,0,0,1)"}}>
          <div className="row1">
            <a className="closeButton" href="#" onClick={this.props.toggleHelpState}>
                <img src={closeButton} width="40px" alt="close"/>
            </a>
          </div>
          <div className="row2">
            <a className={`help-prev ${ this.state.page == 0 ? 'element-hide' : ''}`} onClick={this.prevPage}>&lt;</a>
            <div className="instruction-container" style={{transform:"translate("+this.state.page*-100+"%,0)"}}>
            <div id="page0" className={`instruction element-show`}>
                {(()=>{
                    switch(this.props.showHintPart) {
                        case 0: return "Move mouse to modules to see help information";
                        case 1: return "Board Configuration part. You can add/modify/remove components here";
                        case 2: return "Code Editor part. You can modify your code here";
                        case 3: return "Tool bar part. You can run app or reset your code here";
                        case 4: return "Console part. You can see output or error of the code here";
                    }
                })()}
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