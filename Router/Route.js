import viewsMain from './ViewsMain.js';
import viewsAuth from './ViewsAuth.js';
import Signs from './Signs.js';
import helper from '../helper/handleLog.js'

function Router(app) {
    app.use('*', helper.checkSign, helper.showOptionSigned);
    app.use('/', viewsMain);
    app.use('/api', Signs);
    app.use('/user', helper.checkInfoUser, viewsAuth);
}

export default Router;
