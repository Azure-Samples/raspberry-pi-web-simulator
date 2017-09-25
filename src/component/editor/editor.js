import React, { Component } from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/solarized_light';
import 'brace/ext/searchbox';
import codeFactory from '../../data/codeFactory.js';

import './editor.css';
import '../../common.css'

class Editor extends Component {
  constructor(props) {
    super(props);
    this.codeChange = this.codeChange.bind(this);
    this.resetCode = this.resetCode.bind(this);
    this.state = {
      tabs: [
        {
          name: 'index',
          extension: 'js',
          content: this.getCode('index'),
          readOnly: false
        },
        {
          name: 'getMessage',
          extension: 'js',
          content: this.getCode('getMessage'),
          readOnly: false
        }
      ],
      consoleHide: false,
      activeIndex: 0
    }
  }

  resetCode() {
    var tabs = this.state.tabs;
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].content = codeFactory.resetCode(tabs[i].name);
    }

    this.setState(function () {
      return { tabs: tabs }
    });
  }

  getCode(name) {
    return codeFactory.getCode(name);
  }

  switchIndex(i) {
    this.setState(function () {
      return { activeIndex: i }
    });
  }

  componentDidMount() {
      window.raspberryPiSimulatorAceEditor = this.refs.aceEditor;
  }

  codeChange(value) {
    var tabs = this.state.tabs;
    var tab = tabs[this.state.activeIndex];
    tab.content = value;
    tabs[this.state.activeIndex] = tab;
    this.setState({ tabs: tabs });
    codeFactory.changeCode(tab.name, value);
  }

  componentDidUpdate() {
    if (this.props.consoleHide === this.state.consoleHide) { return; }
    this.setState({ consoleHide: this.props.consoleHide });
    this.refs.aceEditor.editor.resize();
  }

  render() {
    const { tabs, activeIndex } = this.state;
    const tab = tabs[activeIndex];
    return (
      <div className={this.props.consoleHide ? 'codeEditorLong' : 'codeEditorShort'}>
        {
          1 === 0 ? (
            <div className='tabBar' >
              {tabs.map(function (x, i) {
                return (
                  <span className={'codeTab ' + (i === activeIndex ? 'onActive' : '')}
                    onClick={this.switchIndex.bind(this, i)}
                    key={i}>{x.name + '.' + x.extension}
                  </span>)
              }.bind(this))}
            </div>
          ) : ('')
        }
        <AceEditor
          ref='aceEditor'
          mode='javascript'
          theme='solarized_light'
          name='codeEditor'
          className='codeEditor'
          width='100%'
          height='100%'
          showPrintMargin={false}
          onChange={this.codeChange}
          tabSize={2}
          defaultValue={tab.content}
          value={tab.content}
          readOnly={this.props.readOnly || tab.readOnly}
        />
      </div>
    );
  }
}

export default Editor;