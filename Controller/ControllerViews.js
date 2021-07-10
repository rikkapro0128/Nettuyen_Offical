import { Account } from '../models/account.js';
import helper from '../helper/handleApi.js';
import bcrypt from 'bcrypt';

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
            INFO_ACCOUNT: true,
            info,
        });
    }
    async changePasswordView(req, res, next) {
        let info = await helper.getInfoAccount(res.locals.INFO_USER._id);
        info = info.toObject();
        res.render('profile', {
            info,
            CHANGE_PASSWORD: true,
        });
    }
    async changePassword(req, res, next) {
        try {
            const { passwordOld, newPassword, newPasswordConfirm } = req.body;
            const _id = res.locals.INFO_USER._id;
            const codeHashInDb = await Account.findById(_id, 'hashPassword'); // find string hashPassword
            const resultHash = await helper.compareHashString(passwordOld, codeHashInDb.hashPassword); // result Hash between oldPass and string hashPassword
            if(resultHash) {
                if(newPassword === newPasswordConfirm) {
                    const hashNewPass = await helper.getHashString(newPassword);
                    codeHashInDb.set({hashPassword: hashNewPass});
                    await codeHashInDb.save();
                    return res.json({
                        result: true, 
                        mess: 'Mật khẩu đã được đổi!',
                    });
                }
            }
            return res.json({
                result: false, 
                mess: 'Mật khẩu hiện tại hoặc mới không hợp lệ!',
            });
        } catch (error) {
            next(error);
        }
    }

    async yourStorys(req, res, next) {
        let info = await helper.getInfoAccount(res.locals.INFO_USER._id);
        info = info.toObject();
        res.render('profile', {
            info,
            YOUR_STORYS: true,
        });
    }

    async addYourStory(req, res, next) {
        let info = await helper.getInfoAccount(res.locals.INFO_USER._id);
        info = info.toObject();
        res.render('profile', {
            info,
            ADD_YOUR_STORYS: true,
        });
    }

}

export default new Views;