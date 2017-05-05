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

  publish(topic, message, properties, cb) {
    if (!this.connected) {
      cb('Not connected');
      return;
    }
    var queries = [];
    for(var i = 0; i < properties.propertyList.length; i++) {
      queries.push(properties.propertyList[i].key + '=' + properties.propertyList[i].value);
    }

    console.log(JSON.stringify(queries));
    var mqttMsg = new Paho.MQTT.Message(message);
    mqttMsg.destinationName = topic + queries.join('&');
    mqttMsg.qos = 1;
    mqttMsg.retained = false;

    console.log(mqttMsg.destinationName);
    this.client.send(mqttMsg);
  }

  disconnect() {
    if (!this.connected) {
      return;
    }
    this.client.disconnect();
    this.connected = false;
  }
}

export default MQTT;