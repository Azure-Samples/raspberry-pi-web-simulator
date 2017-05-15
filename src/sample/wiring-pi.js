/**
 * A simple fake of wiring pi
 */

const FIXED_PIN = 4;
var _pin;
var turnOn, turnOff;

wpi.digitalWrite = function (pin, digital) {
  if (pin !== _pin || pin !== FIXED_PIN) {
    return;
  }

  if (digital === 1 && turnOn) {
    turnOn();
  }

  if (digital === 0 && turnOff) {
    turnOff();
  }
}

wpi.setup = function (name) {
  if (name !== 'wpi') {
    throw new Error(name + ' is not supported now');
  }
}

wpi.pinMode = function (pin, mode) {
  _pin = pin;
  if (mode !== wpi.OUTPUT) {
    throw new Error(mode + ' is not supported now');
  }
}

wpi.setFunc = function (option) {
  turnOn = option.turnOn;
  turnOff = option.turnOff;
}

wpi.OUTPUT = 'output';

export default function wpi() { };