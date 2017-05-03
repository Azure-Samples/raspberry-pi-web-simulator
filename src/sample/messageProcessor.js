function random(min, max) {
    return Math.random() * (max - min) + min;
}

function getMessage(messageId, cb) {
    var data = {
        temperature: random(20, 31),
        humidity: random(60, 80)
    }
    cb(JSON.stringify({
        messageId: messageId,
        deviceId: 'Raspberry Pi Web Client',
        temperature: data.temperature,
        humidity: data.humidity
    }), data.temperature > 30);
}

module.exports.getMessage = getMessage;