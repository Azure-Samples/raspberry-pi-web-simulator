import { AppInsights } from 'applicationinsights-js';
import uuid from 'uuid';
import ga from 'react-ga';

const pkg = require('../../package.json');

const intrumentKey = '34331cb5-8b57-4d57-b523-3db743d219a7';
const googleAnalticsKey = 'UA-98097460-3';

const userProperties = {
  project: getAppName(),
  userId: getUserId(),
  version: getAppVersion(),
  page: location
};

AppInsights.downloadAndSetup({ instrumentationKey: intrumentKey });
ga.initialize(googleAnalticsKey);

function tracePageView() {
  ga.set(userProperties);
  ga.ga('send', 'pageview');
}

function getAppName() {
  return pkg.name;
}

function getAppVersion() {
  return pkg.version;
}

function getUserId() {
  var id = localStorage.getItem('userId');
  if (!id) {
    id = uuid.v1().toString();
    localStorage.setItem('userId', id);
  }
  return id;
}

function traceEvent(name, property, metric) {
  property = Object.assign(property || {}, userProperties);
  AppInsights.trackEvent(name, property, metric);
  AppInsights.flush();
}

export {
  tracePageView,
  traceEvent,
  userProperties
}