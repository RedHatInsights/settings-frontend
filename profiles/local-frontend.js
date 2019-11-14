/*global module*/

const SECTION = 'settings';
const FRONTEND_PORT = 8002;
const routes = {};

const apps = [ 'hooks', 'rbac', 'sources' ];

routes[`/${SECTION}/`]              = { host: `https://localhost:${FRONTEND_PORT}` };
routes[`/beta/${SECTION}/`]         = { host: `https://localhost:${FRONTEND_PORT}` };
routes[`/apps/${SECTION}/`]         = { host: `https://localhost:${FRONTEND_PORT}` };
routes[`/beta/apps/${SECTION}/`]    = { host: `https://localhost:${FRONTEND_PORT}` };

apps.forEach((app) => {
    routes[`/beta/${SECTION}/${app}`] = { host: 'PORTAL_BACKEND_MARKER' };
    routes[`/${SECTION}/${app}`] = { host: 'PORTAL_BACKEND_MARKER' };
});

module.exports = { routes };
