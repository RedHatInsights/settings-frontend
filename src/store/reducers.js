import { applyReducerHash } from '@redhat-cloud-services/frontend-components-utilities/files/ReducerRegistry';
import { ACTION_TYPES } from '../constants';

export const defaultState = { loaded: false };

export const loading = () => {
    return {
        loaded: false,
        schema: {}
    };};

export const getSchema = (store, { payload }) => {
    return {
        ...store,
        schema: payload,
        loaded: true
    };
};

export default {
    applicationsStore: applyReducerHash({
        [ACTION_TYPES.GET_SCHEMA_FULFILLED]: getSchema,
        [ACTION_TYPES.GET_SCHEMA_PENDING]: loading,
        [ACTION_TYPES.SAVE_VALUES_FULFILLED]: (store) => ({ ...store })
    }, defaultState)
};
