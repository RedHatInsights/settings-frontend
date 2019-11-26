import { getApplicationSchema, saveValues as save, getConfig as config } from './api';
import { ACTION_TYPES } from './constants';

export const getSchema = (application, apiVersion) => ({
    type: ACTION_TYPES.GET_SCHEMA,
    payload: getApplicationSchema(application, apiVersion)
});

export const saveValues = (application, values, apiVersion) => ({
    type: ACTION_TYPES.SAVE_VALUES,
    payload: save(application, values, apiVersion)
});

export const getConfig = () => ({
    type: ACTION_TYPES.GET_CONFIG,
    payload: config()
});
