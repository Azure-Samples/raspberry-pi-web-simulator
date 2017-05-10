// const Client = require('azure-iot-device').Client;
// const Message = require('azure-iot-device').Message;
import {Client, Message} from 'azure-iot-device'
import Protocol from './mqtt.js';
import wpi from './wiring-pi.js';
import codeFactory from '../data/codeFactory.js';

export default function run(option) {
    wpi.setFunc(option);
    try {
        var src = codeFactory.getRunCode('index', 'msgCb', 'errCb');
        var clientApp = new Function('Client', 'Message', 'Protocol', 'wpi', 'msgCb', 'errCb', src);
        clientApp(Client, Message, Protocol, wpi, option.onMessage, option.onError);
        if (src.search(/^((?!\/\/).)*setInterval/gm) < 0) {
            option.onFinish();
        }
    } catch (err) {
        option.onError(err.message || JSON.stringify(err));
        option.onFinish();
    }
}
