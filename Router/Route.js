import Public from './Public.js';

function Router(app) {
    app.use('/', Public);
}

export default Router;
