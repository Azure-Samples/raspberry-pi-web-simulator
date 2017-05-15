import { AppInsights } from 'applicationinsights-js';
import uuid from 'uuid';
const intrumentKey = '0823bae8-a3b8-4fd5-80e5-f7272a2377a9';

AppInsights.downloadAndSetup({ instrumentationKey: intrumentKey });

const rawProperties = {
  userId: getUserId(),
  url: location
};

function getUserId() {
  var id = localStorage.getItem('userId');
  if (!id) {
    id = uuid.v1().toString();
    localStorage.setItem('userId', id);
  }
  return id;
}


function traceEvent(name, property, metric) {
  property = Object.assign(property || {}, rawProperties);
  AppInsights.trackEvent(name, property, metric);
  AppInsights.flush();
}

export { traceEvent }