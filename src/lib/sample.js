import * as deviceSdk from 'azure-iot-device'
import { traceEvent } from './telemetry.js';
import Protocol from './mqtt.js';
import wpi from './wiring-pi.js';
import codeFactory from '../data/codeFactory.js';
import BME280 from './bme280.js';

function fakeRequire(name) {
  if (name === 'wiring-pi') {
    return wpi;
  }
  if (name === 'azure-iot-device') {
    return deviceSdk;
  }

  if (name === 'azure-iot-device-mqtt') {
    return { Mqtt: Protocol };
  }

  if (name === 'bme280-sensor') {
    return BME280;
  }

  throw new Error('not support require new package.');
}

var timeIntervals = [];
function fakeSetInterval(cb, time) {
  var interval = setInterval(cb, time);
  timeIntervals.push(interval);
}

export default function run(option) {
  var fakeConsole = {
    log: option.onMessage,
    error: option.onError
  };
  wpi.setFunc(option.ledSwitch);
  try {
    traceEvent('run-sample');
    var src = codeFactory.getCode('index');
    var clientApp = new Function('require', 'setInterval', 'console', src);
    clientApp(fakeRequire, fakeSetInterval, fakeConsole);

    // use the length to determine whether the code sample is terminated, currently.
    // 1. actually, here should use each item's state to detetermin whether the code sample terminated.
    //    this array can also be used to stop the sample code. (clearInterval)
    // 2. also, there are other function like setTimeOut or Promise can keep code running.
    setTimeout(function () {
      if (timeIntervals.length === 0) {
        option.onFinish();
      }
    }, 5000);
  } catch (err) {
    traceEvent('run-error', { error: err });
    option.onError(err.message || JSON.stringify(err));
    option.onFinish();
  }
}
