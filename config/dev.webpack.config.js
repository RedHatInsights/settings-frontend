const { resolve } = require('path');
const config = require('@redhat-cloud-services/frontend-components-config');

const insightsProxy = {
  https: false,
  ...(process.env.BETA && { deployment: 'beta/apps' }),
};

const webpackProxy = {
  deployment: process.env.BETA ? 'beta/apps' : 'apps',
  useProxy: true,
  env: `${process.env.ENVIRONMENT || 'ci'}-${
    process.env.BETA ? 'beta' : 'stable'
  }`, // for accessing prod-beta start your app with ENVIRONMENT=prod and BETA=true
  appUrl: process.env.BETA
    ? '/beta/settings/applications'
    : '/settings/applications',
  routes: {
    // insert your API endpoints here if needed
    ...(process.env.CONFIG_PORT && {
      [`${process.env.BETA ? '/beta' : ''}/config`]: {
        host: `http://localhost:${process.env.CONFIG_PORT}`,
      },
    }),
  },
};

const { config: webpackConfig, plugins } = config({
  rootFolder: resolve(__dirname, '../'),
  debug: true,
  useFileHash: false,
  ...(process.env.PROXY ? webpackProxy : insightsProxy),
});

const modulesConfig = require('@redhat-cloud-services/frontend-components-config/federated-modules')(
  {
    root: resolve(__dirname, '../'),
    useFileHash: false,
    exposes: {
      './RootApp': resolve(__dirname, '../src/DevEntry'),
    },
  }
);

webpackConfig.devServer.client.overlay = false;

plugins.push(modulesConfig);

module.exports = {
  ...webpackConfig,
  plugins,
};
