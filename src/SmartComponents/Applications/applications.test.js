import React from 'react';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import promiseMiddleware from 'redux-promise-middleware';
import { componentTypes, validatorTypes } from '@data-driven-forms/react-form-renderer';
import Applications from './Applications';
import { init } from '../../store';

const emptyState = {
    applicationsStore: {
        loaded: false,
        schema: []
    }
};
const mockState = {
    applicationsStore: {
        loaded: true,
        schema: [{
            fields: [{
                name: 'email',
                label: 'Email',
                component: componentTypes.TEXT_FIELD,
                isRequired: true,
                validate: [{
                    type: validatorTypes.REQUIRED
                }],
                initialValue: ''
            }, {
                name: 'hideSatelliteSystems',
                label: 'Hide Satellite systems',
                component: componentTypes.SWITCH,
                type: 'boolean',
                initialValue: false
            }]
        }]
    }
};
let mockStore;
init();

describe('Applications', () => {
    beforeEach(() => {
        mockStore = configureStore([ promiseMiddleware() ]);
    });

    it('Render applications with no data', () => {
        const store = mockStore({});
        const wrapper = render(<Provider store={ store }>
            <Applications match={ { params: { id: 'testapp' }} }/>
        </Provider>);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('Render applications with emptyState', () => {
        const store = mockStore(emptyState);
        const wrapper = render(<Provider store={ store }>
            <Applications match={ { params: { id: 'testapp' }} } />
        </Provider>);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('Render applications with mockState', () => {
        const store = mockStore(mockState);
        const wrapper = render(<Provider store={ store }>
            <Applications match={ { params: { id: 'testapp' }} } />
        </Provider>);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
