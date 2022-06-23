import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { ErrState } from './ErrState';

it('plain text hack - render', () => {
  const wrapper = shallow(
    <ErrState errorTitle="Testing" errorDescription="This is a test" />
  );
  expect(toJson(wrapper)).toMatchSnapshot();
});
