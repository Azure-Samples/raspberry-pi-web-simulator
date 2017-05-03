import IotHub from '../lib/azure/iot-hub.js';
import { Message  as IotHubMessage } from 'azure-iot-device'
import messageProcessor from './messageProcessor.js';

var hub = null;
var messageId = 0;

function blinkLED() { }

function sendMessage(msgCb, errCb) {
    messageId++;
    messageProcessor.getMessage(messageId, function (content, temperatureAlert) {
        var message = new IotHubMessage(content);
        message.properties.add('temperatureAlert', temperatureAlert ? 'true' : 'false');
        msgCb('Sending message: ' + content);
        hub.sendEvent(message, function (err) {
            if (err) {
                errCb('Failed to send message to Azure IoT Hub: ' + err.message || JSON.stringify(err));
            } else {
                blinkLED();
                msgCb('Message sent to Azure IoT Hub');
            }
        });
    });
}

function run(connStr, msgCb, errCb) {
    try {
        // distory the old one
        if (hub) {
            hub.distory();
        }
        hub = new IotHub(connStr);
        hub.open(function (err) {
            if (err) {
                errCb('[IoT hub Client] Connect err ' + err.message);
                return;
            }
            messageId = 0;
            setInterval(function () {
                sendMessage(msgCb, errCb);
            }, 10000);
        });

    } catch (error) {
        errCb(error);
    }
}

module.exports = run;