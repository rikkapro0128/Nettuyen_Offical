import helper from './handleApi.js';
let set;

class handleLog {
    setVarApp(app) {
        set = app;
    }
    islog(req, res, next) {
        // this method just make show on/off component state log in header bar
        const { _code_sign } = req.cookies;
        const { state, payload } = helper.tokenExpire(_code_sign, process.env.TOKEN_SCRET);
        if(state) {
            set.locals.IS_LOG = true;
            set.locals.ACCOUNT_NAME = payload.accountName;
        }else {
            set.locals.IS_LOG = false;
        }
        next();
    }
    refreshToken(req, res, next) {
        const { _code_sign, _code_ref_sign } = req.cookies;
        const { state } = helper.tokenExpire(_code_sign, process.env.TOKEN_SCRET);
        if(!state) {
            const common = helper.tokenExpire(_code_ref_sign, process.env.REFRESH_TOKEN_SCRET);
            if(common.state) {
                //refresh token
                const token = helper.getToken({_id: common.payload._id, accountName: common.payload.accountName});
                return res.status(201).cookie('_code_sign', token).redirect('/');
            }
            else {
                // redirect user 
                const getString = req.originalUrl.split('/').includes('private');
                if(!getString) return next();
                return res.render('noteExpireSign');
            }
        }
        next();
    }
}
 
export default new handleLog;