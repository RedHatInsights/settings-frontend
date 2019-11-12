/* eslint-disable  */
import { getApplicationSchema, saveValues as save } from './api';
import { ACTION_TYPES } from './constants';

export const getSchema = (application) => ({
    type: ACTION_TYPES.GET_SCHEMA,
    payload: getApplicationSchema(application)
});

export const saveValues = (application, user, values) => ({
    type: ACTION_TYPES.SAVE_VALUES,
    payload: save(application, user, values)
});
