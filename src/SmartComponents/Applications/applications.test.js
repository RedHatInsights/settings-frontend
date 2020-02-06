import React from 'react';
import { render } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import promiseMiddleware from 'redux-promise-middleware';
import { notificationsMiddleware } from '@redhat-cloud-services/frontend-components-notifications';
import { componentTypes, validatorTypes } from '@data-driven-forms/react-form-renderer';
import Applications from './Applications';
import { init } from '../../store';

const emptyState = {
    applicationsStore: {
        loaded: false,
        configLoaded: false,
        schema: [],
        appsConfig: {}
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
                type: 'checkbox',
                initialValue: false
            }]
        }],
        configLoaded: true,
        appsConfig: {
            testapp: {
                frontend: {
                    title: 'Test app'
                }
            }
        }
    }
};
let mockStore;
init();

describe('Applications', () => {
    beforeEach(() => {
        mockStore = configureStore([ promiseMiddleware(), notificationsMiddleware() ]);
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

    it('should emit type-success notification on saving a form', () => {
        const store = mockStore(mockState);
        const wrapper = mount(
            <Provider store={ store }>
                <Applications appsConfig={ {} } match={ { params: { id: 'testapp' }} } />
            </Provider>,
        );
        const input = wrapper.find('input#email');
        input.getDOMNode().value = 'value';
        input.simulate('change');
        wrapper.update();
        wrapper.find('.pf-m-primary').simulate('click');
        const expectedPayload = [
            expect.anything(),
            expect.objectContaining({
                meta: { notifications: {
                    fulfilled: {
                        description: 'Settings for Red Hat Insights were replaced with new values.',
                        dismissable: true,
                        title: 'Application settings saved',
                        variant: 'success'
                    }
                }}
            })
        ];
        expect(store.getActions()).toEqual(expectedPayload);
    });
});
