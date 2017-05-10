import Paho from "paho-mqtt";
import { EventEmitter } from 'events';

class MQTT extends EventEmitter {
  constructor(config) {
    super();
    this.config = config;
    this.client = new Paho.MQTT.Client('wss://' + config.host + ':443/$iothub/websocket?iothub-no-client-cert=true', config.deviceId);
    this.client.onConnectionLost = this.onConnectionLost;
    this.client.onMessageArrived = this.onMessageArrived;
    this.D2CPoint = 'devices/' + config.deviceId + '/messages/events/';
    this.C2DPoint = 'devices/' + config.deviceId + '/messages/devicebound/#'
  }

  /**
   * Interface as azure-iot-sdk-node
   * ref: https://github.com/Azure/azure-iot-sdk-node/blob/be0ad986b2d8e85d135425b113acb6c1e9815cda/device/transport/mqtt/src/mqtt.ts
   */
  connect(cb) {
    var onConnect = function() {
      this.connected = true;
      cb();
    }.bind(this);
    if (this.connected) {
      cb();
      return;
    }

    var option = {
      timeout: 3,
      cleanSession: true,
      mqttVersion: 4,
      useSSL: true,
      onSuccess: this.onConnect,
      onFailure: this.onFail,
      keepAliveInterval: 60,
      userName: this.config.host + '/' + this.config.deviceId + '/api-version=2016-11-14',
      password: this.config.sharedAccessSignature,
    };

    option.onSuccess = onConnect;
    option.onFailure = cb;
    console.log(JSON.stringify(option));
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

    var mqttMsg = new Paho.MQTT.Message(message.data.toString());
    mqttMsg.destinationName = this.D2CPoint + queries.join('&');
    mqttMsg.qos = 1;
    mqttMsg.retained = false;

    this.client.send(mqttMsg);
    cb();
  }

  disconnect() {
    if (!this.connected) {
      return;
    }
    this.client.disconnect();
    this.connected = false;
  }

  getReceiver(cb) {}

  complete(message, cb) {}

  reject() {
    throw new Error('the MQTT transport does not support rejecting messages.');
  }

  abandon() {
    throw new Error('The MQTT transport does not support abandoning messages.');
  }

  updateSharedAccessSignature(sharedAccessSignature, cb) {}

  setOptions() {}

  sendTwinRequest(method, resource, properties, body, cb) {}

  validateResponse(response) {}

  sendMethodResponse(response, cb) {}

  getTwinReceiver(cb) {}

  /**
   * Private method
   */
  onConnectionLost() {
    return;
  }

  subscribe(point, cb) {
    console.log(point);
    this.client.subscribe('/' + point, {
      qos: 0
    });
    this.onMessageArrivedCallback = cb;
  }

  onMessageArrived(message) {
    console.log(JSON.stringify(message));
    if (!this.onMessageArrivedCallback) {
      console.error('no callback specific');
      return;
    }
    this.onMessageArrivedCallback(message.payloadString);
  }
}

export default MQTT;