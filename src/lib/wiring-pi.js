/**
 * A simple fake of wiring pi
 */

const FIXED_PIN = 4;
var _pin;
var ledSwitch;

wpi.digitalWrite = function (pin, digital) {
  if (pin !== _pin || pin !== FIXED_PIN || !ledSwitch) {
    return;
  }

  if (digital === 1) {
    ledSwitch(true);
  }

  if (digital === 0) {
    ledSwitch(false);
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

wpi.setFunc = function(ledSwitchCb) {
  ledSwitch = ledSwitchCb;
}

wpi.OUTPUT = 'output';

export default function wpi() { };