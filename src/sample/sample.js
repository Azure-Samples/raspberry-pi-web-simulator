// const Client = require('azure-iot-device').Client;
// const Message = require('azure-iot-device').Message;
import {Client, Message} from 'azure-iot-device'
import Protocol from './mqtt.js';
import wpi from './wiring-pi.js';
import codeFactory from '../data/codeFactory.js';

export default function run(option) {
    wpi.setFunc(option);
    try {
        var clientApp = new Function('Client', 'Message', 'Protocol', 'wpi', 'msgCb', 'errCb', codeFactory.getRunCode('index', 'msgCb', 'errCb'));
        clientApp(Client, Message, Protocol, wpi, option.onMessage, option.onError);
    } catch (err) {
        option.onError(err.message || JSON.stringify(err));
        option.onFinish();
    }
}
