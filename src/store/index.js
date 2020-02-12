import ReducerRegistry from '@redhat-cloud-services/frontend-components-utilities/files/ReducerRegistry';
import promiseMiddleware from 'redux-promise-middleware';
import { notificationsMiddleware } from '@redhat-cloud-services/frontend-components-notifications';

let registry;

export function init (...middleware) {
    if (registry) {
        throw new Error('store already initialized');
    }

    registry = new ReducerRegistry({}, [
        promiseMiddleware(),
        notificationsMiddleware(),
        ...middleware
    ]);

    return registry;
}

export function getStore () {
    return registry.getStore();
}

export function register (...args) {
    return registry.register(...args);
}
