import Views from './Views.js';
import Signs from './Signs.js';

function Router(app) {
    app.use('/', Views);
    app.use('/check', Signs);
}

export default Router;
