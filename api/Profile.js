import { Account } from '../models/account.js';

class Profile {
    async updateInfoAccount(req, res, next) {
        const user = await Account.findById(req.params.id_user, 'info').exec();
        if(!user) return next(new Error('User invalid or not exist!'));
        user.set({
            info: req.body,
        });
        await user.save();
        res.redirect('/user/info');
    }
}

export default new Profile;