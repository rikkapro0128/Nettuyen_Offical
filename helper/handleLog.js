import helper from './handleApi.js';
import { Account } from '../models/account.js';

class helperLog {
    showOptionSigned(req, res, next) {
        // this method just make show on/off component state log in header bar
        const { _code_sign } = req.cookies;
        const { state, payload } = helper.tokenExpire(_code_sign, process.env.TOKEN_SCRET);
        if(state) {
            res.locals.IS_LOG = true;
            res.locals.INFO_USER = payload;
        }else {
            res.locals.IS_LOG = false;
        }
        next();
    }
    checkSign(req, res, next) {
        const { _code_sign, _code_ref_sign } = req.cookies;
        if(_code_sign && _code_ref_sign) {
            const state_code_sign = helper.tokenExpire(_code_sign, process.env.TOKEN_SCRET);
            // true when token is not expire
            // false when token is expire
            if(!state_code_sign.state) {
                const state_code_ref_sign = helper.tokenExpire(_code_ref_sign, process.env.REFRESH_TOKEN_SCRET);
                //refresh token
                if(state_code_ref_sign.state) {
                    const token = helper.getToken({_id: state_code_ref_sign.payload._id, accountName: state_code_ref_sign.payload.accountName});
                    return res.status(201).cookie('_code_sign', token).redirect(301, req.originalUrl);
                }else {
                    // redirect user 
                    return res.clearCookie('_code_sign').clearCookie('_code_ref_sign').render('noteExpireSign');
                }
            }
        }
        next();
    }
}
 
export default new helperLog;
