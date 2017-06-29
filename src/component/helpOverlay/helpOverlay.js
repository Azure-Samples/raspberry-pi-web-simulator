import React, { Component } from 'react';
import { traceEvent } from '../../lib/telemetry.js';
import './helpOverlay.scss';
import closeButton from '../../img/closeButton.png';
// import connectionStringInPortal from '../../img/connectionStringInPortal.png';
import img1 from '../../img/step1.png';
import img2_1 from '../../img/step2_1.png';
import img2_2 from '../../img/step2_2.png';
import img2_3 from '../../img/step2_3.png';
import img3_1 from '../../img/step3_1.png';
import img3_2 from '../../img/step3_2.png';

class HelpOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      numOfSteps: 3,
      subStep: 0,
      timeSpan: 3000,
      numOfSubStep: [3,3,2],
      offset: [[0,50,120],[0,70,120],[0,70]]
    };
    if(this.toggleInterval) {
            clearInterval(this.toggleInterval);
        }
        this.toggleInterval = setInterval(()=>{this.toggleStep();},this.state.timeSpan);
  }

  nextStep = () => {
    if(this.state.step<this.state.numOfSteps-1) {
        this.gotoStep(this.state.step+1);
    }
    else {
        this.onClose();
    }
  }

  prevStep = () => {
    if(this.state.step>0) {
        this.gotoStep(this.state.step-1);
    }
  }

  gotoStep = (id) => {
      this.setState(()=>{
            return {
                step: id,
                subStep: 0
            }
        });
        if(this.toggleInterval) {
            clearInterval(this.toggleInterval);
        }
        this.toggleInterval = setInterval(()=>{this.toggleStep();},this.state.timeSpan);
  }

  goToSubStep = (id) => {
      this.setState(()=>{
          return {
              subStep: id
          }
      });
      if(this.toggleInterval) {
            clearInterval(this.toggleInterval);
      }
  }

  toggleStep = () => {
      this.setState((prev)=>{
          return {
              subStep: (prev.subStep + 1) % prev.numOfSubStep[this.state.step]
          }
      });
  }

  changeSubStep = (e) => {
    var wheelData = this.extractDelta(e.nativeEvent);
    if(!wheelData) {
        return;
    }
    if (wheelData < 0) {
        if(this.state.subStep !== this.state.numOfSubStep[this.state.step] - 1 ) {
            this.goToSubStep(this.state.subStep + 1);
        }
    }else {
        if(this.state.subStep !== 0 ) {
            this.goToSubStep(this.state.subStep - 1);
        }
    }
  }

  extractDelta(e) {
    if (e.wheelDelta) {
        return e.wheelDelta;
    }
    if (e.deltaY) {
        return e.deltaY*-1;
    }
}

  onClose = () => {
      this.props.toggleHelpState();
      if(this.state.step == this.state.numOfSteps - 1) {
          traceEvent('help-complete');
      }
      this.setState(()=> {
          return {
              step: 0,
              subStep: 0
          }
      });
  }

  componentWillReceiveProps = (nextProps) => {
      if(!this.props.needShowHelp && nextProps.needShowHelp) {
          this.setState(()=> {
            return {
                step: 0,
                subStep: 0
            }
        });
          if(this.toggleInterval) {
            clearInterval(this.toggleInterval);
          }
          this.toggleInterval = setInterval(()=>{this.toggleStep();},this.state.timeSpan);
      }
  }

  render() {
    return (
      <div className="overlay" style={{display: this.props.needShowHelp ? "block" : "none"}}>
          <div className="instruction">
                <div className="header-bar">
                    <div className="step-container">
                        <div className="step" onClick={this.gotoStep.bind(this,0)}>
                            <div className="step-circle" />
                            <div className={`${this.state.step === 0 ? 'step-circle-chosen':''}`} />
                            <span className="step-label" >Step 1</span>
                        </div>
                        <div className="step" onClick={this.gotoStep.bind(this,1)}>
                            <div className="step-circle" />
                            <div className={`${this.state.step === 1 ? 'step-circle-chosen':''}`} />
                            <span className="step-label" >Step 2</span>
                        </div>
                        <div className="step" onClick={this.gotoStep.bind(this,2)}>
                            <div className="step-circle" />
                            <div className={`${this.state.step === 2 ? 'step-circle-chosen':''}`} />
                            <span className="step-label" >Step 3</span>
                        </div>
                    </div>
                    <div className="close-button" onClick={this.onClose}>
                        ×
                    </div>
                </div>
                <div className="content">
                    <div onWheel={this.changeSubStep} className="text-instruction">
                        <div className="text-instruction-title">
                            {(()=>{
                                switch(this.state.step) {
                                    case 0: return "Overview of Raspberry Pi Simulator";
                                    case 1: return "Prepare an Azure IoT hub and get the device connection string";
                                    case 2: return "Run the sample app on Pi web simulator";
                                    default: return "";
                                }
                            })()}
                        </div>
                        <div className={`text-instruction-description`}>
                            <div className={`paragraph-container ${this.state.step === 0 ? '':'element-none'}`}>
                                <div className={`paragraph ${this.state.subStep === 0 ? 'paragraph-selected':''}`} style={{transform:"translate(0,-"+this.state.offset[this.state.step][this.state.subStep]+"px"}}>
                                    1. <span className="bold">Assembly Area</span>. You can see your device status.
                                </div>
                                <div className={`paragraph ${this.state.subStep === 1 ? 'paragraph-selected':''}`} style={{transform:"translate(0,-"+this.state.offset[this.state.step][this.state.subStep]+"px"}}>
                                    2. <span className="bold">Coding Area</span>. An online code editor for you to make an app on Raspberry Pi with Node.js
                                </div>
                                <div className={`paragraph ${this.state.subStep === 2 ? 'paragraph-selected':''}`} style={{transform:"translate(0,-"+this.state.offset[this.state.step][this.state.subStep]+"px"}}>
                                    3. <span className="bold">Integrated console window</span>. You can see the output of your app.
                                </div>
                            </div>
                            <div className={`paragraph-container ${this.state.step === 1 ? '':'element-none'}`}>
                                <div className={`paragraph ${this.state.subStep === 0 ? 'paragraph-selected':''}`} style={{transform:"translate(0,-"+this.state.offset[this.state.step][this.state.subStep]+"px"}}>
                                    1. In the <a target="_blank" href="https://portal.azure.com/">Azure portal</a>, click <span className="bold">New > Internet of Things > IoT Hub</span> to provision a new IoT hub.
                                </div>
                                <div className={`paragraph ${this.state.subStep === 1 ? 'paragraph-selected':''}`} style={{transform:"translate(0,-"+this.state.offset[this.state.step][this.state.subStep]+"px"}}>
                                    2. In the <span className="bold">Device Explorer</span> pane, click <span className="bold">Add</span> to add a device to your IoT hub.
                                </div>
                                <div className={`paragraph ${this.state.subStep === 2 ? 'paragraph-selected':''}`} style={{transform:"translate(0,-"+this.state.offset[this.state.step][this.state.subStep]+"px"}}>
                                    3. Select the device you just created and copy the <span className="bold">primary key of the connection string</span>.
                                </div>
                            </div>
                            <div className={`paragraph-container ${this.state.step === 2 ? '':'element-none'}`}>
                                <div className={`paragraph ${this.state.subStep === 0 ? 'paragraph-selected':''}`} style={{transform:"translate(0,-"+this.state.offset[this.state.step][this.state.subStep]+"px"}}>
                                    1. Replace the placeholder in <span className="bold">Line 15</span> with the Azure IoT hub <span className="bold">device connection string</span>.
                                </div>
                                <div className={`paragraph ${this.state.subStep === 1 ? 'paragraph-selected':''}`} style={{transform:"translate(0,-"+this.state.offset[this.state.step][this.state.subStep]+"px"}}>
                                    2. Click <span className="bold">Run</span> button or type "npm start" in the console window to run the application.
                                </div>
                            </div>
                            <div className={`paragraph-scrollbar`} >
                                <div style={{height:(100/this.state.numOfSubStep[this.state.step])+"%"}} className={`scrollbar-indicator ${this.state.numOfSubStep[this.state.step] <= 1 ? 'element-none':''} ${this.state.subStep === 0 ? 'scrollbar-indicator-selected':''}`}/>
                                <div style={{height:(100/this.state.numOfSubStep[this.state.step])+"%"}} className={`scrollbar-indicator ${this.state.numOfSubStep[this.state.step] <= 1 ? 'element-none':''} ${this.state.subStep === 1 ? 'scrollbar-indicator-selected':''}`}/>
                                <div style={{height:(100/this.state.numOfSubStep[this.state.step])+"%"}} className={`scrollbar-indicator ${this.state.numOfSubStep[this.state.step] <= 2 ? 'element-none':''} ${this.state.subStep === 2 ? 'scrollbar-indicator-selected':''}`}/>
                            </div>
                        </div>
                        <div className="operation">
                            <div className={`operation-button-1 ${this.state.step === 0 ? 'element-none':''}`} onClick={this.prevStep}>
                                Back
                            </div>
                            <div className="operation-button-2" onClick={this.nextStep}>
                                {this.state.step === this.state.numOfSteps - 1 ? "Got it" : "Next"}
                            </div>
                        </div>
                        <div className="link-container">
                            <a target="_blank" href="https://docs.microsoft.com/azure/iot-hub/iot-hub-raspberry-pi-web-simulator-get-started">See doc</a>
                            <a target="_blank" href="https://github.com/Azure-Samples/raspberry-pi-web-simulator">View source</a>
                        </div>
                    </div>
                    <div onWheel={this.changeSubStep} className="picture-instruction">
                        <div className={`picture-container ${this.state.step === 0 ? '':'element-none'}`} >
                            <img className="picture" src={img1} />
                        </div>
                        <div className={`picture-container ${this.state.step === 1 ? '':'element-none'}`} >
                            <img className="picture" style={{left:"0%",transform:"translate("+this.state.subStep*-100+"%,0)"}} src={img2_1} />
                            <img className="picture" style={{left:"100%",transform:"translate("+this.state.subStep*-100+"%,0)"}} src={img2_2} />
                            <img className="picture" style={{left:"200%",transform:"translate("+this.state.subStep*-100+"%,0)"}} src={img2_3} />
                        </div>
                        <div className={`picture-container ${this.state.step === 2 ? '':'element-none'}`} >
                            <img className="picture" style={{left:"0%",transform:"translate("+this.state.subStep*-100+"%,0)"}} src={img3_1} />
                            <img className="picture" style={{left:"100%",transform:"translate("+this.state.subStep*-100+"%,0)"}} src={img3_2} />
                        </div>
                        <div className="picture-indicator-container" >
                            <div className={`picture-indicator ${this.state.step === 0 || this.state.numOfSubStep[this.state.step] <= 1 ? 'element-none':''} ${this.state.subStep === 0 ? 'picture-indicator-selected':''}`} onClick={this.goToSubStep.bind(this,0)}/>
                            <div className={`picture-indicator ${this.state.step === 0 || this.state.numOfSubStep[this.state.step] <= 1 ? 'element-none':''} ${this.state.subStep === 1 ? 'picture-indicator-selected':''}`} onClick={this.goToSubStep.bind(this,1)} />
                            <div className={`picture-indicator ${this.state.step === 0 || this.state.numOfSubStep[this.state.step] <= 2 ? 'element-none':''} ${this.state.subStep === 2 ? 'picture-indicator-selected':''}`} onClick={this.goToSubStep.bind(this,2)} />
                        </div>
                        
                    </div>
                </div>
          </div>
      </div>
    );
  }
}

export default HelpOverlay;