import React from 'react';
import { mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { createPromise } from 'redux-promise-middleware';
import notificationsMiddleware from '@redhat-cloud-services/frontend-components-notifications/notificationsMiddleware';
import {
  componentTypes,
  validatorTypes,
} from '@data-driven-forms/react-form-renderer';
import Applications from './Applications';
import { act } from 'react-dom/test-utils';
import ErrorState from '@redhat-cloud-services/frontend-components/ErrorState';
import { RenderForms } from '../../PresentationalComponents';

import * as api from '../../api';

jest.mock('../../api', () => {
  const actual = jest.requireActual('../../api');
  return {
    __esModule: true,
    ...actual,
  };
});

const emptyState = {
  applicationsStore: {
    loaded: false,
    configLoaded: false,
    schema: [],
    appsConfig: {},
  },
};
const mockState = {
  applicationsStore: {
    loaded: true,
    schema: [
      {
        fields: [
          {
            name: 'email',
            label: 'Email',
            component: componentTypes.TEXT_FIELD,
            isRequired: true,
            validate: [
              {
                type: validatorTypes.REQUIRED,
              },
            ],
            initialValue: '',
          },
          {
            name: 'hideSatelliteSystems',
            label: 'Hide Satellite systems',
            component: componentTypes.SWITCH,
            type: 'checkbox',
            initialValue: false,
          },
        ],
      },
    ],
    configLoaded: true,
    appsConfig: {
      testapp: {
        frontend: {
          title: 'Test app',
        },
      },
    },
  },
};
let mockStore;

describe('Applications', () => {
  const saveValuesSpy = jest.spyOn(api, 'saveValues');
  const getApplicationSchemaSpy = jest.spyOn(api, 'getApplicationSchema');
  const getConfigSpy = jest.spyOn(api, 'getConfig');
  saveValuesSpy.mockImplementation(() => Promise.resolve({}));
  getApplicationSchemaSpy.mockImplementation(() =>
    Promise.resolve({ fields: [] })
  );
  getConfigSpy.mockImplementation(() => Promise.resolve(''));

  beforeEach(() => {
    mockStore = configureStore([createPromise(), notificationsMiddleware()]);
  });

  it('Render applications with no data', async () => {
    const store = mockStore({});
    let wrapper;
    await act(async () => {
      wrapper = mount(
        <Provider store={store}>
          <Applications match={{ params: { id: 'testapp' } }} />
        </Provider>
      );
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });

  it('Render applications with error', async () => {
    const store = mockStore({ applicationsStore: { error: true } });
    let wrapper;
    await act(async () => {
      wrapper = mount(
        <Provider store={store}>
          <Applications match={{ params: { id: 'testapp' } }} />
        </Provider>
      );
    });
    wrapper.update();
    expect(wrapper.find(ErrorState)).toHaveLength(1);
    expect(wrapper.find(RenderForms)).toHaveLength(0);
  });

  it('Render applications with emptyState', () => {
    const store = mockStore(emptyState);
    const wrapper = render(
      <Provider store={store}>
        <Applications match={{ params: { id: 'testapp' } }} />
      </Provider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('Render applications with mockState', async () => {
    const store = mockStore(mockState);
    let wrapper;
    await act(async () => {
      wrapper = mount(
        <Provider store={store}>
          <Applications match={{ params: { id: 'testapp' } }} />
        </Provider>
      );
    });
    wrapper.update();
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should emit type-success notification on saving a form', async () => {
    const store = mockStore(mockState);
    let wrapper;

    await act(async () => {
      wrapper = mount(
        <Provider store={store}>
          <Applications appsConfig={{}} match={{ params: { id: 'testapp' } }} />
        </Provider>
      );
    });

    await act(async () => {
      wrapper.update();
    });

    const input = wrapper.find('input#email');
    input.getDOMNode().value = 'value';
    input.simulate('change');

    await act(async () => {
      wrapper.update();
    });

    wrapper.find('form.pf-c-form').simulate('submit');
    const expectedPayload = expect.objectContaining({
      meta: {
        notifications: {
          fulfilled: {
            description:
              'Settings for Red Hat Insights were replaced with new values.',
            dismissable: true,
            title: 'Application settings saved',
            variant: 'success',
          },
        },
      },
    });
    await act(async () => {
      wrapper.update();
    });

    expect(store.getActions().pop()).toEqual(expectedPayload);
  });
});
