import { AppInsights } from 'applicationinsights-js';
import uuid from 'uuid';
import ga from 'react-ga';
import Localization from '../localization/localization'

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

// Prevent AI from tracking user's location IP information.
AppInsights.queue.push(function () {
  AppInsights.context.addTelemetryInitializer(function (envelope) {
      envelope.tags['ai.location.ip'] = '0.0.0.0';
  });
});

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

function tracePageViewAI(name, property, metric) {
  property = Object.assign({referrer:document.referrer, lang:Localization.getLocalizedString().getLanguage()}, property, userProperties);
  AppInsights.trackPageView(null,null,property);
  AppInsights.flush();
}

function traceEvent(name, property, metric) {
  property = Object.assign({lang:Localization.getLocalizedString().getLanguage()}, property,  userProperties);
  AppInsights.trackEvent(name, property, metric);
  AppInsights.flush();
}

export {
  tracePageView,
  tracePageViewAI,
  traceEvent,
  userProperties
}