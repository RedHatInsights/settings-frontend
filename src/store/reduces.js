import { applyReducerHash } from '@redhat-cloud-services/frontend-components-utilities/files/ReducerRegistry';
import { ACTION_TYPES } from '../constants';

const defaultState = { loaded: false };

const loading = () => {
    return {
        loaded: false,
        schema: {}
    };};

const getSchema = (store, { payload }) => {
    return {
        ...store,
        schema: payload,
        loaded: true
    };};

export default {
    applicationsStore: applyReducerHash({
        [ACTION_TYPES.GET_SCHEMA_FULFILLED]: getSchema,
        [ACTION_TYPES.GET_SCHEMA_PENDING]: loading
    }, defaultState)
};
