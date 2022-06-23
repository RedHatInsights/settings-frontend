import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import registry from './store';
import App from './App';
import { getBaseName } from '@redhat-cloud-services/frontend-components-utilities/helpers';

const Settings = () => (
  <Provider store={registry.getStore()}>
    <BrowserRouter basename={getBaseName(window.location.pathname, 1)}>
      <App />
    </BrowserRouter>
  </Provider>
);

Settings.propTypes = {
  logger: PropTypes.func,
};

export default Settings;
