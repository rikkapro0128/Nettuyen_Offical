import { Account } from '../models/account.js';
import bcrypt from 'bcrypt';
import help from '../helper/handleToken.js';

class Signs {
    signin(req, res, next) {
        try {
            
        } catch (error) {
            
        }
    }
    async signup(req, res, next) {
        try {
            if(req.body.password === req.body.passwordConfirm) {
                let account = new Account({
                    accountName: req.body.accountName,
                    password: req.body.password,
                });
                const accessToken = help.getToken({_id: account._id, accountName: account.accountName});
                const refreshToken = help.getRefreshToken({_id: account._id, accountName: account.accountName});
                if(refreshToken) { account.refreshToken = refreshToken };
                const state = await account.save();
                if(state) res.json({accessToken, refreshToken});
            }
        } catch (error) {
            if(error) {
                next(error.message);
                res.json({errorMessage: error});
            }
        }
    }
    signout(req, res, next) {
        res.send('you click signout!');
    }
}

export default new Signs;