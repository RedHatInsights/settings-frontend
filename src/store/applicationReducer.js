import { applyReducerHash } from '@redhat-cloud-services/frontend-components-utilities/ReducerRegistry';
import { ACTION_TYPES } from '../constants';

export const defaultState = { loaded: false, configLoaded: false, error: null };

export const loading = (store) => {
  return {
    ...store,
    loaded: false,
    schema: [],
  };
};

export const getSchema = (store, { payload }) => {
  return {
    ...store,
    schema: payload,
    loaded: true,
  };
};

export const getConfig = (store, { payload }) => {
  return {
    ...store,
    appsConfig: payload,
    configLoaded: true,
  };
};

export const getSchemaRejected = (store) => ({
  ...store,
  error: true,
});

export default {
  applicationsStore: applyReducerHash(
    {
      [ACTION_TYPES.GET_SCHEMA_FULFILLED]: getSchema,
      [ACTION_TYPES.GET_SCHEMA_PENDING]: loading,
      [ACTION_TYPES.GET_SCHEMA_REJECTED]: getSchemaRejected,
      [ACTION_TYPES.SAVE_VALUES_FULFILLED]: (store) => ({ ...store }),
      [ACTION_TYPES.GET_CONFIG_PENDING]: (store) => ({
        ...store,
        appsConfig: {},
        configLoaded: false,
      }),
      [ACTION_TYPES.GET_CONFIG_FULFILLED]: getConfig,
    },
    defaultState
  ),
};
