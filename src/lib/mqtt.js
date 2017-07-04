import Paho from "paho-mqtt";
import { results } from 'azure-iot-common';
import { EventEmitter } from 'events';
import {traceEvent, userProperties} from './telemetry.js';
import MqttReceiver from './mqtt-receiver.js';
import util from 'util';

var TOPIC_RESPONSE_PUBLISH_FORMAT = "$iothub/%s/res/%d/?$rid=%s";

class MQTT extends EventEmitter {
  constructor(config) {
    super();
    this.config = config;
    traceEvent('connecting');
    this.client = new Paho.MQTT.Client('wss://' + config.host + ':443/$iothub/websocket?iothub-no-client-cert=true', config.deviceId);
    this.client.onConnectionLost = this.onConnectionLost;
    this.D2CPoint = 'devices/' + config.deviceId + '/messages/events/';
    this.C2DPoint = 'devices/' + config.deviceId + '/messages/devicebound/#';
  }

  /**
   * Interface as azure-iot-sdk-node
   * ref: https://github.com/Azure/azure-iot-sdk-node/blob/be0ad986b2d8e85d135425b113acb6c1e9815cda/device/transport/mqtt/src/mqtt.ts
   */
  connect(cb) {
    var onConnect = function () {
        if(this.interruptConnect) {
            this.disconnect();
            return;
        }
      this.connected = true;
      traceEvent('success-connect');
      cb();
    }.bind(this);

    var onFail = function (err) {
      this.connected = false;
      cb(err);
    }

    if (this.connected) {
      cb();
      return;
    }

    var option = {
      timeout: 3,
      cleanSession: true,
      mqttVersion: 4,
      useSSL: true,
      onSuccess: onConnect,
      onFailure: onFail,
      keepAliveInterval: 60,
      userName: this.config.host + '/' + this.config.deviceId + '/api-version=2016-11-14&DeviceClientType=' + MQTT.getClientType(),
      password: this.config.sharedAccessSignature,
    };

    this.client.connect(option);
  }

  sendEvent(message, cb) {
    if (!message) {
      cb('message is empty');
    }
    if (!this.connected) {
      cb('Not connected');
      return;
    }
    var queries = [];
    for (var i = 0; i < message.properties.propertyList.length; i++) {
      queries.push(message.properties.propertyList[i].key + '=' + message.properties.propertyList[i].value);
    }

    this.publish(message.data.toString(), this.D2CPoint + queries.join('&'));
    cb();
  }

  disconnect() {
    if (!this.connected) {
      this.interruptConnect = true;
      return;
    }
    this.client.disconnect();
    this.connected = false;
    
  }

  getReceiver(cb) {
    if (!this._receiver) {
      this._receiver = new MqttReceiver(this.client, this.C2DPoint);
    }

    cb(null, this._receiver);
  }

  complete(message, cb) {
    cb(null, new results.MessageCompleted());
  }

  reject() {
    throw new Error('the MQTT transport does not support rejecting messages.');
  }

  abandon() {
    throw new Error('The MQTT transport does not support abandoning messages.');
  }

  updateSharedAccessSignature(sharedAccessSignature, cb) {
    this.disconnect();
    this.config.sharedAccessSignature = sharedAccessSignature;
    cb(null, new results.SharedAccessSignatureUpdated(true));
  }

  setOptions(options, done) {
    if (!options) {
      throw new Error('The options parameter can not be \'' + options + '\'');
    }

    if (this.config.sharedAccessSignature && options.cert) {
      throw new Error('Cannot set x509 options on a device that uses symmetric key authentication.');
    }

    this.config.x509 = {
      cert: options.cert,
      key: options.key,
      passphrase: options.passphrase
    };

    if (done) {
      done(null);
    }
  }

  sendTwinRequest(method, resource, properties, body, cb) {
    throw new Error('not supported sendTwinRequest');
  }

  validateResponse(response) {
    if (!response) {
      throw new Error('Parameter \'response\' is falsy');
    }
    if (!(response.requestId)) {
      throw new Error('Parameter \'response.requestId\' is falsy');
    }
    if (typeof (response.requestId) === 'string' && response.requestId.length === 0) {
      throw new Error('Parameter \'response.requestId\' is an empty string');
    }
    if (typeof (response.requestId) !== 'string') {
      throw new Error('Parameter \'response.requestId\' is not a string.');
    }
    if (!(response.status)) {
      throw new Error('Parameter \'response.status\' is falsy');
    }
    if (typeof (response.status) !== 'number') {
      throw new Error('Parameter \'response.status\' is not a number');
    }
  }

  sendMethodResponse(response, cb) {
    this.validateResponse(response);
    var topicName = util.format(
      TOPIC_RESPONSE_PUBLISH_FORMAT,
      'methods',
      response.status,
      response.requestId
    );
    this.publish(JSON.stringify(response.payload), topicName);
  }

  getTwinReceiver(cb) {
    throw new Error('not supported getTwinReceiver');
  }

  /**
   * Private method
   */
  onConnectionLost() {
    return;
  }

  publish(message, destination) {
    var mqttMsg = new Paho.MQTT.Message(message);
    mqttMsg.destinationName = destination;
    mqttMsg.qos = 1;
    mqttMsg.retained = false;

    this.client.send(mqttMsg);
  }

  static getClientType() {
    return encodeURIComponent(userProperties.project + '/' + userProperties.version + '/' + userProperties.userId);
  }
}

export default MQTT;