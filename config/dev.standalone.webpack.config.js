const { resolve } = require('path');
const config = require('@redhat-cloud-services/frontend-components-config');
const {
  rbac,
  backofficeProxy,
  defaultServices,
} = require('@redhat-cloud-services/frontend-components-config-utilities/standalone');

const { config: webpackConfig, plugins } = config({
  rootFolder: resolve(__dirname, '../'),
  debug: true,
  useFileHash: false,
  deployment: process.env.BETA ? 'beta/apps' : 'apps',
  useProxy: false,
  appUrl: `/beta/settings/applications`,
  proxyVerbose: true,
  routes: {
    // set local API in env.
    // Example:
    //     export API_PORT=8000
    //     export LOCAL_API="/api/cost-management/v1/"
    [process.env.LOCAL_API]: {
      host: `http://localhost:${process.env.API_PORT}`,
    },
  },
  env: 'qa-beta',
  standalone: {
    rbac,
    backofficeProxy,
    ...defaultServices,
  },
});

const modulesConfig =
  require('@redhat-cloud-services/frontend-components-config/federated-modules')(
    {
      root: resolve(__dirname, '../'),
      useFileHash: false,
      exposes: {
        './RootApp': resolve(__dirname, '../src/DevEntry'),
      },
    }
  );

plugins.push(modulesConfig);

module.exports = {
  ...webpackConfig,
  plugins,
};
