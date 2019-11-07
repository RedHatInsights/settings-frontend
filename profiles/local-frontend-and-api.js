/*global module*/

const SECTION = 'settings';
const FRONTEND_PORT = 8002;
const API_PORT = 8888;
const routes = {};

routes[`/${SECTION}`]              = { host: `https://localhost:${FRONTEND_PORT}` };
routes[`/beta/${SECTION}`]         = { host: `https://localhost:${FRONTEND_PORT}` };
routes[`/apps/${SECTION}`]         = { host: `https://localhost:${FRONTEND_PORT}` };
routes[`/beta/apps/${SECTION}`]    = { host: `https://localhost:${FRONTEND_PORT}` };


routes[`/api/${SECTION}`] = { host: `https://localhost:${API_PORT}` };

module.exports = { routes };
