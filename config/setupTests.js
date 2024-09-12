import { ReadableStream, TextDecoder, TextEncoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
global.ReadableStream = ReadableStream;

import { configure, mount, render, shallow } from 'enzyme';
import Adapter from '@cfaester/enzyme-adapter-react-18';

import React from 'react';

configure({ adapter: new Adapter() });

global.shallow = shallow;
global.render = render;
global.mount = mount;
global.React = React;

global.window.insights = {
  ...(window.insights || {}),
  chrome: {
    ...((window.insights && window.insights.chrome) || {}),
    auth: {
      ...((window.insights &&
        window.insights.chrome &&
        window.insights.chrome) ||
        {}),
      isBeta: () => true,
      getUser: () =>
        new Promise((res) =>
          res({
            identity: {
              // eslint-disable-next-line camelcase
              account_number: '0',
              type: 'User',
            },
          })
        ),
    },
  },
};

global.insights.chrome = {
  init() {},
  identifyApp() {},
  isBeta: () => true,
  auth: {
    getUser: () =>
      Promise.resolve({
        identity: {
          user: {
            username: 'user',
            // eslint-disable-next-line camelcase
            is_org_admin: true,
          },
        },
      }),
  },
};
