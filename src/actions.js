import { getApplicationSchema } from './api';
import { ACTION_TYPES } from './constants';

export const getSchema = (application) => ({
    type: ACTION_TYPES.GET_SCHEMA,
    payload: getApplicationSchema(application)
});
