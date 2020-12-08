import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { PlainTextWithLinks } from './PlainTextWithLinks';

it('plain text hack - render', () => {
  const wrapper = shallow(
    <PlainTextWithLinks
      text="hello world <link>Read here</link> and good bye <link>Learn more</link>"
      linkProps={[
        { href: 'http://github.com' },
        { href: '#', className: 'ccc' },
      ]}
    />
  );
  expect(toJson(wrapper)).toMatchSnapshot();
});
