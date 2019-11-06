import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import asyncComponent from '../asyncComponent';

describe('General component', () => {
    it('should render correctly', () => {
        const General = asyncComponent(() => import(/* webpackChunkName: "General" */ '../../SmartComponents/General/General'));
        const wrapper = shallow(<General />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
