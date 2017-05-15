import { EventEmitter } from 'events';
import { Message } from 'azure-iot-common';
import QueryString from 'querystring';
import URL from 'url';

const TOPIC_METHODS_SUBSCRIBE = "$iothub/methods/POST/#";

class MqttReceiver extends EventEmitter {
  constructor(mqttClient, topicMessage) {
    super();
    this._client = mqttClient;
    this._topics = {
      'message': {
        name: topicMessage,
        listenersCount: 0,
        subscribeInProgress: false,
        subscribed: false,
        topicMatchRegex: /^devices\/.*\/messages\/devicebound\/.*$/,
        handler: this._onC2DMessage.bind(this)
      },
      'method': {
        name: TOPIC_METHODS_SUBSCRIBE,
        listenersCount: 0,
        subscribeInProgress: false,
        subscribed: false,
        topicMatchRegex: /^\$iothub\/methods\/POST\/.*$/,
        handler: this._onDeviceMethod.bind(this)
      }
    };

    this._setupSubscription = this._setupSubscription.bind(this);
    this._removeSubscription = this._removeSubscription.bind(this);
    this._dispatchMqttMessage = this._dispatchMqttMessage.bind(this);
    this._onC2DMessage = this._dispatchMqttMessage.bind(this);
    this.onDeviceMethod = this.onDeviceMethod.bind(this);
    this._onDeviceMethod = this._onDeviceMethod.bind(this);

    this._client.onMessageArrived = this._dispatchMqttMessage;

    this.on('newListener', function (eventName) {
      var topic;
      if (eventName === 'message') {
        topic = this._topics['message'];
      } else if (eventName.indexOf('method') === 0) {
        topic = this._topics['method'];
      }

      if (!topic) { return; }

      if (topic.subscribed || topic.subscribeInProgress) { return; }

      this._setupSubscription(topic);
    });
  }

  _setupSubscription(topic) {
    topic.subscribeInProgress = true;
    this._client.subscribe(topic.name, { qos: 0 });
    topic.subscribeInProgress = false;
    topic.subscribed = true;
  }

  _removeSubscription(topic) {
    throw new Error('not suppport _removeSubscription yet');
  }

  _dispatchMqttMessage(messages) {
    var topic = messages.destinationName;
    var payload = messages.payloadString;

    if (this._topics.message.topicMatchRegex.test(topic)) {
      this._topics.message.handler(topic, payload);
    } else if(this._topics.method.topicMatchRegex.test(topic)) {
      this._topics.method.handler(topic, payload);
    }
  }

  _onC2DMessage(topic, payload) {
    var msg = new Message(payload);

    var topicParts = topic.split('/');
    if (topicParts[4]) {
      var keyValuePairs = topicParts[4].split('&');

      for (var i = 0; i < keyValuePairs.length; i++) {
        var keyValuePair = keyValuePairs[i].split('=');
        var k = decodeURIComponent(keyValuePair[0]);
        var v = decodeURIComponent(keyValuePair[1]);

        switch (k) {
          case '$.mid':
            msg.messageId = v;
            break;
          case '$.to':
            msg.to = v;
            break;
          case '$.exp':
            msg.expiryTimeUtc = v;
            break;
          case '$.cid':
            msg.correlationId = v;
            break;
          case '$.uid':
            msg.userId = v;
            break;
          default:
            msg.properties.add(k, v);
            break;
        }
      }
    }

    this.emit('message', msg);
  }

  _parseMessage(topic, body) {
    var url, path, query;
    try {
      url = URL.parse(topic);
      path = url.path.split('/');
      query = QueryString.parse(url.query);
    }
    catch (err) {
      return undefined;
    }

    // if the topic has a querystring then 'path' will include it; so
    // we strip it out
    var lastPathComponent = path[path.length - 1];
    if (lastPathComponent.indexOf('?') !== -1) {
      path[path.length - 1] = lastPathComponent.substr(
        0, lastPathComponent.indexOf('?')
      );
    }

    if (path.length > 0 && path[0] === '$iothub') {
      var message = {};
      if (path.length > 1 && path[1].length > 0) {
        var mod = message[path[1]] = {};

        // parse the request ID if there is one
        if (!!(query.$rid)) {
          message.requestId = query.$rid;
        }

        // parse the other properties properties (excluding $rid)
        message.properties = query;
        delete message.properties.$rid;

        // save the body
        message.body = body;

        // parse the verb
        if (path.length > 2 && path[2].length > 0) {
          mod.verb = path[2];

          //  $iothub/methods/POST/{method name}?$rid={request id}&{serialized properties}
          if (path.length > 3 && path[3].length > 0) {
            mod.methodName = path[3];
          } else {
            throw new Error('Device method call\'s MQTT topic name does not include the method name.');
          }
        }
      }

      return message;
    }
  }

  onDeviceMethod(methodName, callback) {
    this.on('method_' + methodName, callback);
  }

  _onDeviceMethod(topic, payload) {
    var message = this._parseMessage(topic, payload);

    if (message) {
      this.emit('method_' + message.methods.methodName, message);
    }
  }
}

export default MqttReceiver;