import { SharedAccessSignature, encodeUriComponentStrict, ConnectionString } from 'azure-iot-common';
import MQTT from '../transport/mqtt.js';

class IoTHub {
  constructor(connStr) {
    this.connectionString = ConnectionString.parse(connStr, ['HostName', 'DeviceId', 'SharedAccessKey']);;

    this.D2CPoint = 'devices/' + this.connectionString['DeviceId'] + '/messages/events/';
    // here we only use mqtt
    this.transport = new MQTT('wss://' + this.connectionString['HostName'], 443, '/$iothub/websocket?iothub-no-client-cert=true', this.connectionString['DeviceId']);
  };

  connect() {
    var options = {
      timeout: 3,
      cleanSession: true,
      mqttVersion: 4,
      useSSL: true,
      onSuccess: this.onConnect,
      onFailure: this.onFail,
      keepAliveInterval: 60,
      userName: calName(this.connectionString),
      password: calPasswd(this.connectionString),
    };
    this.transport.connect(options, function (err) {
      if (err) {
        console.error('ERROR when connect to IoT hub: ' + JSON.stringify(err));
      } else {
        console.log('connected to your IoT hub');
        this.sendEvent('hahahaha', function (err) {
          if (err) {
            console.error('ERROR when sending message ' + err);
          } else {
            console.log('yes!');
          }
        });
      }
    }.bind(this));
  };

  disconnect() {

  };

  sendEvent(message, cb) {
    if (!message) { cb('message is empty'); }
    this.transport.publish(this.D2CPoint, message, cb);
  }
}

function getUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
      v = (c === 'x') ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  }); // RFC4122 version 4 compatible solution;
}

function calName(connectionString) {
  return connectionString['HostName'] + '/' + connectionString['DeviceId'] + '/api-version=2016-11-14';
}

function calPasswd(connectionString) {
  var se = Math.round(new Date().getTime() / 1000) + 24 * 3600;
  var uri = encodeUriComponentStrict(connectionString['HostName'] + '/devices/' + connectionString['DeviceId']);
  return SharedAccessSignature.create(uri, null, connectionString['SharedAccessKey'], se).toString();
}

export default IoTHub;