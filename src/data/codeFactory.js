const raw = {
  index: 'const wpi = require(\'wiring-pi\');\nconst Client = require(\'azure-iot-device\').Client;\nconst Message = require(\'azure-iot-device\').Message;\nconst Protocol = require(\'azure-iot-device-mqtt\').Mqtt;\n\nvar connectionString = \'[Your Azure IoT hub device connection string]\';\n\nfunction random(min, max) {\n  return Math.random() * (max - min) + min;\n}\n\nfunction getMessage(id, cb) {\n  var temperature = random(20, 31);\n  var humidity = random(60, 80);\n  cb(JSON.stringify({\n    messageId: id,\n    deviceId: \'Raspberry Pi Web Client\',\n    temperature: temperature,\n    humidity: humidity\n  }), temperature > 30);\n}\n\nvar messageId = 0;\nfunction sendMessage() {\n  messageId++;\n  getMessage(messageId, function(content, temperatureAlert) {\n    var message = new Message(content);\n    message.properties.add(\'temperatureAlert\', temperatureAlert.toString());\n    console.log(\'Sending message: \' + content);\n    client.sendEvent(message, function(err) {\n      if (err) {\n        console.error(\'Failed to send message to Azure IoT Hub: \'\n          + err.message || JSON.stringify(err));\n      } else {\n        blinkLED();\n        console.log(\'Message sent to Azure IoT Hub\');\n      }\n    });\n  });\n\n}\n\nfunction blinkLED() {\n  wpi.digitalWrite(4, 1);\n  setTimeout(function() {\n    wpi.digitalWrite(4, 0);\n  }, 500);\n}\n\nvar client = Client.fromConnectionString(connectionString, Protocol);\n\nwpi.setup(\'wpi\');\nwpi.pinMode(4, wpi.OUTPUT);\n\nclient.open((err) => {\n  if (err) {\n    console.error(\'[IoT hub Client] Connect error: \' + err.message);\n    return;\n  }\n  console.log(\'successfully connect to IoT hub\');\n  setInterval(sendMessage, 2000);\n});\n'
}

var code = JSON.parse(JSON.stringify(raw));

const localStoragePrefix = 'rpiSimu';

codeFactory.getCode = function (name) {
  var value = localStorage.getItem(localStoragePrefix + name);
  if (value) {
    code[name] = value;
  }
  return code[name]
};

codeFactory.resetCode = function (name) {
  console.log(raw[name]);
  codeFactory.changeCode(name, raw[name]);
  return code[name];
}

codeFactory.getRunCode = function (name, msgCb, errCb) {
  var raw = code[name];
  // remove require
  var result = raw.replace(/.+?=[ ]*require\(.+\n/g, '');
  result = result.replace(/console\.log/g, msgCb);
  result = result.replace(/console\.error/g, errCb);
  return result;
}

codeFactory.changeCode = function (name, value) {
  code[name] = value;  
  localStorage.setItem(localStoragePrefix + name, value);  
}

export default function codeFactory() {};
