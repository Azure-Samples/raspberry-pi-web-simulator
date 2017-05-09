/**
 * A simple fake of wiring pi
 */

const FIXED_PIN = 4;
var _pin;

wpi.digitalWrite = function (pin, number) {
  if (pin !== _pin || pin !== FIXED_PIN) {
    return;
  }
}

wpi.setup = function (name) {
  if (name !== 'wpi') {
    throw new Error(name + ' is not supported now');
  }
}

wpi.pinMode = function(pin, mode) {
  _pin = pin;
  if (mode !== wpi.OUTPUT) {
    throw new Error(mode + ' is not supported now');
  }
}

wpi.OUTPUT = 'output';

export default function wpi() {};