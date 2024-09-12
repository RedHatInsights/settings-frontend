const path = require('path');

module.exports = {
  appUrl: ['/beta/settings/applications', '/settings/applications'],
  debug: true,
  useProxy: true,
  proxyVerbose: true,
  /**
   * Change to false after your app is registered in configuration files
   */
  interceptChromeConfig: false,
  /**
   * Add additional webpack plugins
   */
  plugins: [],
  ...(process.env.IS_BETA && { deployment: 'beta/apps' }),
  hotReload: process.env.HOT === 'true',
  moduleFederation: {
    exclude: ['react-router-dom'],
    shared: [
      {
        'react-router-dom': {
          singleton: true,
          version: '*',
          requiredVersion: '*',
        },
      },
    ],
  },
};
