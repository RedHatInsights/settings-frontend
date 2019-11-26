import { componentTypes, validatorTypes } from '@data-driven-forms/react-form-renderer';
import instance from '@redhat-cloud-services/frontend-components-utilities/files/interceptors';
import { safeLoad } from 'js-yaml';

export const getConfig = () => {
    return instance.get(`${insights.chrome.isBeta() ? '/beta' : ''}/config/main.yml`)
    .then(safeLoad);
};

const localStorageKey = (application, user) => `@@settings-${application}-${user}`;
const getLocalStorageItem = (key, subkey) => JSON.parse(localStorage.getItem(key) || '{}')[subkey];

const mockSchema = (application, user) => ([{
    fields: [{
        name: 'email',
        label: 'Email',
        component: componentTypes.TEXT_FIELD,
        isRequired: true,
        validate: [{
            type: validatorTypes.REQUIRED
        }],
        initialValue: getLocalStorageItem(localStorageKey(application, user), 'email')
    }, {
        name: 'hideSatelliteSystems',
        label: 'Hide Satellite systems',
        component: componentTypes.SWITCH,
        type: 'checkbox',
        initialValue: getLocalStorageItem(localStorageKey(application, user), 'hideSatelliteSystems')
    }]
}]);

const mockSave = (application, user, values) => localStorage.setItem(localStorageKey(application, user), JSON.stringify(values));

export const getApplicationSchema = async (application, apiVersion = 'v1') => {
    try {
        return await instance.get(`/api/${application}/${apiVersion}/settings`);
    } catch {
        return insights.chrome.auth.getUser().then(({ identity }) => mockSchema(application, identity.user.username));
    }
};

export const saveValues = async (application, values, apiVersion = 'v1') => {
    try {
        return await instance.post(`/api/${application}/${apiVersion}/settings`, { values });
    } catch {
        return insights.chrome.auth.getUser().then(({ identity }) => mockSave(application, identity.user.username, values));
    }
};
