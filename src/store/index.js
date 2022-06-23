import ReducerRegistry, {
  applyReducerHash,
} from '@redhat-cloud-services/frontend-components-utilities/ReducerRegistry';
import promiseMiddleware from 'redux-promise-middleware';
import notificationsMiddleware from '@redhat-cloud-services/frontend-components-notifications/notificationsMiddleware';
import errorReducer from './errorReducer';
import logger from 'redux-logger';

const registry = new ReducerRegistry({}, [
  promiseMiddleware,
  notificationsMiddleware(),
  ...(window.insights.chrome.isProd ? [] : [logger]),
]);

registry.register({ errorReducer: applyReducerHash(errorReducer) });

export function getStore() {
  return registry.getStore();
}

export function register(...args) {
  return registry.register(...args);
}

export default registry;
