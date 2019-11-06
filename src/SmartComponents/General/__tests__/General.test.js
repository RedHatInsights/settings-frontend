import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import toJson from 'enzyme-to-json';
import General from '../General';

const mockStore = configureMockStore();
const store = mockStore({});

describe('General component', () => {
    it('should render correctly', () => {
        const wrapper = mount(
            <Provider store={ store }>
                <Router>
                    <General />
                </Router>
            </Provider>
        );
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
