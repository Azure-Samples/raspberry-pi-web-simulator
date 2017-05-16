class BME280 {
  constructor() {
    this.readSensorData = this.readSensorData.bind(this);
    this.init = this.init.bind(this);
  }

  init(option) {
    this.inited = true;
    return new Promise(function (resolve/*, reject*/) {
      resolve();
    });
  }

  reset() {
    return new Promise(function (resolve/*, reject */) {
      resolve();
    });
  }

  readSensorData() {
    var _inited = this.inited;
    return new Promise(function (resolve, reject) {
      if (!_inited) {
        return reject('You must first call bme280.init()');
      }

      resolve({
        temperature_C: BME280.random(20, 32),
        humidity: BME280.random(60, 80),
        pressure_hPa: BME280.random(10, 12)
      });
    });
  }

  static random(min, max) {
    return Math.random() * (max - min) + min;
  }

  static BME280_DEFAULT_I2C_ADDRESS() {
    return 0x77;
  }

  static CHIP_ID1_BMP280() {
    return 0x56;
  }

  static CHIP_ID2_BMP280() {
    return 0x57;
  }

  static CHIP_ID3_BMP280() {
    return 0x58;
  }

  static CHIP_ID_BME280() {
    return 0x60;
  }

  static convertCelciusToFahrenheit(c) {
    return c * 9 / 5 + 32;
  }

  static convertHectopascalToInchesOfMercury(hPa) {
    return hPa * 0.02952998751;
  }

  static convertMetersToFeet(m) {
    return m * 3.28084;
  }
}

export default BME280;