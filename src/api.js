/* eslint-disable  */
import { componentTypes, validatorTypes } from '@data-driven-forms/react-form-renderer';

const localStorageKey = (application, user) => `@@settings-${application}-${user}`;
const getLocalStorageItem = (key, subkey) => (JSON.parse(localStorage.getItem(key) || {})[subkey]);

const mockSchema = (application, user) => ({
    fields: [{
        name: 'email',
        label: 'Email',
        component: componentTypes.TEXT_FIELD,
        isRequired: true,
        validate: [{
            type: validatorTypes.REQUIRED
        }],
        initialValue: getLocalStorageItem(localStorageKey(application, user), 'email'),
    }, {
        name: 'hideSateliteSystems',
        label: 'Hide Satelite Systems',
        component: componentTypes.SWITCH,
        type: 'boolean',
            initialValue: getLocalStorageItem(localStorageKey(application, user), 'hideSateliteSystems'),
    }]
});

const mockSave = (application, user, values) => localStorage.setItem(localStorageKey(application, user), JSON.stringify(values))

export const getApplicationSchema = (application) => (insights.chrome.auth.getUser().then(({ identity }) => mockSchema(application, identity.user.username)))
export const saveValues = (application, values) => (insights.chrome.auth.getUser().then(({ identity }) => mockSave(application, identity.user.username, values)))