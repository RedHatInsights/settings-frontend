import { componentTypes, validatorTypes } from '@data-driven-forms/react-form-renderer';

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

export const getApplicationSchema = (application) => Promise.resolve(mockSchema(application));
