import Paho from "paho-mqtt";

class MQTT {
  connect(host, port, path, clientId, option, cb) {
    if (!this.connected) {
      cb();
      return;
    }
    var onConnect = function () {
      this.connected = true;
      cb();
    }.bind(this);

    var onConnectionLost = function () {
      cb('connect lost');
      return;
    }.bind(this);

    this.client = new Paho.MQTT.Client(host + ':' + port + path, clientId);

    this.client.onConnectionLost = onConnectionLost;
    this.client.onMessageArrived = this.onMessageArrived;
    option.onSuccess = onConnect;
    option.onFailure = cb;
    console.log(JSON.stringify(option));
    this.client.connect(option);
  };

  onMessageArrived() { }
  publish(topic, message, option, cb) {
    
  };
}

export default MQTT;