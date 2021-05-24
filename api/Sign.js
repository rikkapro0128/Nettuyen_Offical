import { Account } from '../models/account.js';
import helper from '../helper/handleApi.js';

class Signs {
    async signin(req, res, next) {
        try {
            const {accountName, password} = req.body;
            if(!accountName || !password) throw new Error('account name or password missing!');
            const doc = await Account.findOne({accountName}).exec();
            const checkPass = await helper.compareHashString(password, doc.hashPassword);
            if(!checkPass) throw new Error('account name or password invalid!');
            const code = helper.getRefTokenAndToken({_id: doc._id, accountName: doc.accountName});
            doc.refreshToken = code.refreshToken;
            const state = await doc.save();
            if(state) {
                code['message'] = 'Signin success!';
                res.json(code);
            }
        } catch (error) {
            res.json({errorMessage: error.message});
            next(error);
        }
    }
    async signup(req, res, next) {
        try {
            if(req.body.password === req.body.passwordConfirm) {
                let account = new Account({
                    accountName: req.body.accountName,
                    password: req.body.password,
                });
                const code = helper.getRefTokenAndToken({_id: account._id, accountName: account.accountName});
                account.refreshToken = code.refreshToken;
                const state = await account.save();
                if(state) {
                    code['message'] = 'Signup success!';
                    res.json(code);
                }
            }
        } catch (error) {
            res.json({errorMessage: error.message});
            next(error);
        }
    }
    async signout(req, res, next) {
        // do move ref token in database
        const refToken = req.cookies._code_ref_sign || null;
        if(refToken) {
            const { payload, token } = helper.tokenExpire(refToken, process.env.REFRESH_TOKEN_SCRET);
            const doc = await Account.findOne({_id: payload._id}).exec();
            if(doc.refreshToken === refToken) {
                await Account.updateOne({ _id: payload._id }, { refreshToken: '' });
                return res
                .clearCookie('_code_sign')
                .clearCookie('_code_ref_sign')
                .json({message: 'success!'});
            }
        }
        return res.redirect('/');
    }
}

export default new Signs;