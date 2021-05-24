import { Account } from '../models/account.js';
import helper from '../helper/handleApi.js';

class Views {
    home(req, res, next) {
        res.render('home');
    }
    signin(req, res, next) {
        res.render('signin');
    }
    signup(req, res, next) {
        res.render('signup');
    }
    about(req, res, next) {
        res.render('about');
    }
    async profile(req, res, next) {
        let info = await helper.getInfoAccount(res.locals.INFO_USER._id);
        info = info.toObject();
        res.render('profile', {
            info,
        });
    }
}

export default new Views;