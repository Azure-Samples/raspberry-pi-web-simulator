var code = {
  'getMessage': 'function random(min, max) {\n  return Math.random() * (max - min) + min;\n}\n\nexport function getMessage(messageId) {\n  var data = {\n    temperature: random(20, 31),\n    humidity: random(60, 80)\n  }\n  return {\n    content: JSON.stringify({\n      messageId: messageId,\n      deviceId: \'Raspberry Pi Web Client\',\n      temperature: data.temperature,\n      humidity: data.humidity\n    }),\n    temperatureAlert: data.temperature > 30\n  };\n}',
  'index': 'const fs = require(\'fs\');\nconst path = require(\'path\');\n\nconst wpi = require(\'wiring-pi\');\n\nconst Client = require(\'azure-iot-device\').Client;\nconst ConnectionString = require(\'azure-iot-device\').ConnectionString;\nconst Message = require(\'azure-iot-device\').Message;\nconst Protocol = require(\'azure-iot-device-mqtt\').Mqtt;\n\nvar messageId = 0;\nvar client;\n\nfunction getMessage(id, cb) {\n  var data = {\n    temperature: random(20, 31),\n    humidity: random(60, 80)\n  };\n  cb(JSON.stringify({\n    messageId: id,\n    deviceId: \'Raspberry Pi Web Client\',\n    temperature: data.temperature,\n    humidity: data.humidity\n  }), data.temperature > 30);\n}\n\nfunction sendMessage() {\n  messageId++;\n  getMessage(messageId, function(content, temperatureAlert) {\n    var message = new IotHubMessage(content);\n    message.properties.add(\'temperatureAlert\', temperatureAlert ? \'true\' : \'false\');\n    console.log(\'Sending message: \' + content);\n    hub.sendEvent(message, function(err) {\n      if (err) {\n        console.error(\'Failed to send message to Azure IoT Hub: \'\n          + err.message || JSON.stringify(err));\n      } else {\n        blinkLED();\n        console.log(\'Message sent to Azure IoT Hub\');\n      }\n    });\n  });\n}\n\nfunction blinkLED() {\n  wpi.digitalWrite(config.LEDPin, 1);\n  setTimeout(function() {\n    wpi.digitalWrite(config.LEDPin, 0);\n  }, 500);\n}\n\n(function(connectionString) {\n  client = Client.fromConnectionString(connectionString, Protocol);\n\n  client.open((err) => {\n    if (err) {\n      console.error(\'[IoT hub Client] Connect error: \' + err.message);\n      return;\n    }\n    setInterval(sendMessage, 2000);\n  });\n})(process.env.AzureIoTDeviceConnectionString);\n'
}

function getCode(name) {
  return code[name];
};

function getRunCode(name) {
  return code[name].replace(/export\s+function/g, 'function');
}

function changeCode(value) {
  code[value.name] = value.content;
}

module.exports.getCode = getCode;
module.exports.changeCode = changeCode;
module.exports.getRunCode = getRunCode;