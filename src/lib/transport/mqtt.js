import Paho from "paho-mqtt";

class MQTT {
  constructor(host, port, path, clientId) {
    var onConnectionLost = function () {
      return;
    }.bind(this);

    this.client = new Paho.MQTT.Client(host + ':' + port + path, clientId);

    this.client.onConnectionLost = onConnectionLost;
    this.client.onMessageArrived = this.onMessageArrived;
  }

  connect(option, cb) {
    if (this.connected) {
      cb();
      return;
    }
    var onConnect = function () {
      this.connected = true;
      cb();
    }.bind(this);

    option.onSuccess = onConnect;
    option.onFailure = cb;
    console.log(JSON.stringify(option));
    this.client.connect(option);
  }

  onMessageArrived() { }

  publish(topic, message, cb) {
    if (!this.connected) {
      cb('Not connected');
      return;
    }
    var mqttMsg = new Paho.MQTT.Message(message);
    mqttMsg.destinationName = topic;
    mqttMsg.qos = 0;
    mqttMsg.retained = false;

    this.client.send(mqttMsg);
  }

  disconnect() {

  }
}

export default MQTT;