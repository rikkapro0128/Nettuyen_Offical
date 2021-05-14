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
            if(state) res.json(code);
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
                if(state) res.json(code);
            }
        } catch (error) {
            res.json({errorMessage: error.message});
            next(error);
        }
    }
    signout(req, res, next) {
        res.send('you click signout!');
    }
}

export default new Signs;