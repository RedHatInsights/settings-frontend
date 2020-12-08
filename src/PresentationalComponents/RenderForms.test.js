import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import RenderForms from './RenderForms';

describe('component', () => {
  it('should render - no data', () => {
    const wrapper = shallow(<RenderForms />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render - no schema', () => {
    const wrapper = shallow(<RenderForms loaded schemas={[]} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render - one schema', () => {
    const wrapper = shallow(<RenderForms loaded schemas={[{}]} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render - multiple schema', () => {
    const wrapper = shallow(<RenderForms loaded schemas={[{}, {}]} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
