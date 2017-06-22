import React, { Component } from 'react';
import { traceEvent } from '../../lib/telemetry.js';
import './helpOverlay.css';
import closeButton from '../../img/closeButton.png';
// import connectionStringInPortal from '../../img/connectionStringInPortal.png';
import img1 from '../../img/test-1.png';
import img2_1 from '../../img/test-2-1.png';
import img2_2 from '../../img/test-2-2.png';
import img2_3 from '../../img/test-2-3.png';
import img3_1 from '../../img/test-3-1.png';
import img3_2 from '../../img/test-3-2.png';

class HelpOverlay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      numOfSteps: 3,
      subStep: 0,
      numOfSubStep: [3,3,2]
    }
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
        this.toggleInterval = setInterval(()=>{this.toggleStep();},5000);
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
    if (e.nativeEvent.wheelDelta < 0) {
        if(this.state.subStep !== this.state.numOfSubStep[this.state.step] - 1 ) {
            this.goToSubStep(this.state.subStep + 1);
        }
    }else {
        if(this.state.subStep !== 0 ) {
            this.goToSubStep(this.state.subStep - 1);
        }
    }
  }

  onClose = () => {
      this.props.toggleHelpState();
      if(this.state.step == this.state.numOfSteps - 1) {
          traceEvent('help-complete');
      }
      this.setState(()=> {
          return {
              step: 0
          }
      });
  }

  componentWillReceiveProps = (nextProps) => {
      if(!this.props.needShowHelp && nextProps.needShowHelp) {
          if(this.toggleInterval) {
            clearInterval(this.toggleInterval);
          }
          this.toggleInterval = setInterval(()=>{this.toggleStep();},5000);
      }
  }

  render() {
    return (
      <div className="overlay" style={{display: this.props.needShowHelp ? "block" : "none"}}>
          <div className="instruction">
                <div className="header-bar">
                    <div className="space-2" />
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
                    <div className="space-1" />
                    <div className="close-button" onClick={this.onClose}>
                        ×
                    </div>
                </div>
                <div className="content">
                    <div onWheel={this.changeSubStep} className="text-instruction">
                        <div className="text-instruction-title">
                            {(()=>{
                                switch(this.state.step) {
                                    case 0: return "Overview of Raspberry Pi web simulator";
                                    case 1: return "Get your IoT Hub device connection string";
                                    case 2: return "Run a sample applicaiton on Pi web simulator";
                                    default: return "";
                                }
                            })()}
                        </div>
                        <div className={`text-instruction-description`}>
                            <div className={`paragraph-container ${this.state.step === 0 ? '':'element-none'}`}>
                                <div className={`paragraph ${this.state.subStep === 0 ? 'paragraph-selected':''}`} style={{transform:"translate(0,"+this.state.subStep*-100+"%)"}}>
                                    1. These products are the culmination of incredible partnerships across the company. While watching the many different teams work together at the launch events
                                </div>
                                <div className={`paragraph ${this.state.subStep === 1 ? 'paragraph-selected':''}`} style={{transform:"translate(0,"+this.state.subStep*-100+"%)"}}>
                                    2. These products are the culmination of incredible partnerships across the company. While watching the many different teams work together at the launch events
                                </div>
                                <div className={`paragraph ${this.state.subStep === 2 ? 'paragraph-selected':''}`} style={{transform:"translate(0,"+this.state.subStep*-100+"%)"}}>
                                    3. These products are the culmination of incredible partnerships across the company. While watching the many different teams work together at the launch events
                                </div>
                            </div>
                            <div className={`paragraph-container ${this.state.step === 1 ? '':'element-none'}`}>
                                <div className={`paragraph ${this.state.subStep === 0 ? 'paragraph-selected':''}`} style={{transform:"translate(0,"+this.state.subStep*-100+"%)"}}>
                                    1. These products are the culmination of incredible partnerships across the company. While watching the many different teams work together at the launch events
                                </div>
                                <div className={`paragraph ${this.state.subStep === 1 ? 'paragraph-selected':''}`} style={{transform:"translate(0,"+this.state.subStep*-100+"%)"}}>
                                    2. These products are the culmination of incredible partnerships across the company. While watching the many different teams work together at the launch events
                                </div>
                                <div className={`paragraph ${this.state.subStep === 2 ? 'paragraph-selected':''}`} style={{transform:"translate(0,"+this.state.subStep*-100+"%)"}}>
                                    3. These products are the culmination of incredible partnerships across the company. While watching the many different teams work together at the launch events
                                </div>
                            </div>
                            <div className={`paragraph-container ${this.state.step === 2 ? '':'element-none'}`}>
                                <div className={`paragraph ${this.state.subStep === 0 ? 'paragraph-selected':''}`} style={{transform:"translate(0,"+this.state.subStep*-100+"%)"}}>
                                    1. These products are the culmination of incredible partnerships across the company. While watching the many different teams work together at the launch events
                                </div>
                                <div className={`paragraph ${this.state.subStep === 1 ? 'paragraph-selected':''}`} style={{transform:"translate(0,"+this.state.subStep*-100+"%)"}}>
                                    2. These products are the culmination of incredible partnerships across the company. While watching the many different teams work together at the launch events
                                </div>
                            </div>
                            <div className={`paragraph-scrollbar`} >
                                <div className={`scrollbar-indicator ${this.state.numOfSubStep[this.state.step] <= 1 ? 'element-none':''} ${this.state.subStep === 0 ? 'scrollbar-indicator-selected':''}`}/>
                                <div className={`scrollbar-indicator ${this.state.numOfSubStep[this.state.step] <= 1 ? 'element-none':''} ${this.state.subStep === 1 ? 'scrollbar-indicator-selected':''}`}/>
                                <div className={`scrollbar-indicator ${this.state.numOfSubStep[this.state.step] <= 2 ? 'element-none':''} ${this.state.subStep === 2 ? 'scrollbar-indicator-selected':''}`}/>
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
                    </div>
                    <div onWheel={this.changeSubStep} className="picture-instruction">
                        <div className={`picture-container ${this.state.step === 0 ? '':'element-none'}`} >
                            <img className="picture" src={img1} />
                        </div>
                        <div className={`picture-container ${this.state.step === 1 ? '':'element-none'}`} >
                            <img className="picture" style={{transform:"translate("+this.state.subStep*-100+"%,0)"}} src={img2_1} />
                            <img className="picture" style={{transform:"translate("+this.state.subStep*-100+"%,0)"}} src={img2_2} />
                            <img className="picture" style={{transform:"translate("+this.state.subStep*-100+"%,0)"}} src={img2_3} />
                        </div>
                        <div className={`picture-container ${this.state.step === 2 ? '':'element-none'}`} >
                            <img className="picture" style={{transform:"translate("+this.state.subStep*-100+"%,0)"}} src={img3_1} />
                            <img className="picture" style={{transform:"translate("+this.state.subStep*-100+"%,0)"}} src={img3_2} />
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