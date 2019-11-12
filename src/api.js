/* eslint-disable  */
import { componentTypes, validatorTypes } from '@data-driven-forms/react-form-renderer';

const localStorageKey = (appName, user) => `@@settings-${appName}-${user}`;
const mockSchema = () => ({
    fields: [{
        name: 'email',
        label: 'Email',
        component: componentTypes.TEXT_FIELD,
        isRequired: true,
        validate: [{
            type: validatorTypes.REQUIRED
        }]
    }, {
        name: 'hideSateliteSystems',
        label: 'Hide Satelite Systems',
        component: componentTypes.SWITCH,
        type: 'boolean'
    }]
}
);
const mockSave = (application, user, values) => localStorage.setItem(localStorageKey(application, user), JSON.stringify(values))

export const getApplicationSchema = (application) => Promise.resolve(mockSchema(application));
export const saveValues = (application, user, values) => Promise.resolve(mockSave(application, user, values))
