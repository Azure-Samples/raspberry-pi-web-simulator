import React from 'react';
import ReactDOM from 'react-dom';
import Banner from './component/banner/banner';
import Toolbar from './component/toolbar/toolbar';
import Display from './component/display/display';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

const instance = (
  <div className='main'>
    <Banner />
    <Toolbar />
    <Display className='display'/>
  </div>
);

ReactDOM.render(
  instance,
  document.getElementById('root')
);
