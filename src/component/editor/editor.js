import React, { Component } from 'react';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/monokai';

import codeFactory from '../../data/codeFactory.js';

import './editor.css';
import '../../common.css'

class Editor extends Component {
  constructor(props) {
    super(props);
    this.codeChange = this.codeChange.bind(this);
    this.state = {
      tabs: [
        {
          name: 'index',
          extension: 'js',
          content: codeFactory.getCode('index'),
          readOnly: true
        },
        {
          name: 'getMessage',
          extension: 'js',
          content: codeFactory.getCode('getMessage'),
          readOnly: false
        }
      ],
      activeIndex: 0
    }
  }

  switchIndex(i) {
    this.setState(function () {
      return { activeIndex: i }
    });
  }

  codeChange(value) {
    var tabs = this.state.tabs;
    var tab = tabs[this.state.activeIndex];
    tab.content = value;
    tabs[this.state.activeIndex] = tab;
    this.setState({ tabs: tabs });
    codeFactory.changeCode(tab);
  }

  render() {
    const {tabs, activeIndex} = this.state;
    const tab = tabs[activeIndex];
    return (
      <div>
        <div className='tabBar'>
          {tabs.map(function (x, i) {
            return (<span className={'codeTab ' + (i === activeIndex ? 'onActive' : '') }
              onClick={this.switchIndex.bind(this, i) }
              key={i}>{x.name + '.' + x.extension}</span>)
          }.bind(this)) }
        </div>
        <AceEditor
          mode='javascript'
          theme='monokai'
          name='codeEditor'
          className='codeEditor'
          width='100%'
          showPrintMargin={false}
          onChange={this.codeChange}
          tabSize={2}
          defaultValue={tab.content}
          value={tab.content}
          readOnly={tab.readOnly}
          />
      </div>
    );
  }
}

export default Editor;