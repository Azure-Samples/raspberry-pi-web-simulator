const raw = {
  index: require('./sample.js')
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

codeFactory.changeCode = function (name, value) {
  code[name] = value;
  localStorage.setItem(localStoragePrefix + name, value);
}

export default function codeFactory() { };
