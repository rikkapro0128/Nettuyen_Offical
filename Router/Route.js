import Views from './Views.js';
import Signs from './Signs.js';
import handleLog from '../helper/handleLog.js'

function Router(app) {
    app.use('*', handleLog.refreshToken, handleLog.islog);
    app.use('/', Views);
    app.use('/api', Signs);
}

export default Router;
