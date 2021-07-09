import { Account } from '../models/account.js';

class Profile {
    async updateInfoAccount(req, res, next) {
        try {
            const { info, image } = { info: JSON.parse(req.body.info), image: req.file };
            if(image) {
                const pathAvatar = `${process.env.DIR_AVATAR}\\${image.filename}`;
                info.avatarPath = pathAvatar;
            }
            const user = await Account.findById(req.params.id_user, 'info').exec();
            if(!user) return next(new Error('User invalid or not exist!'));
            user.set({info});
            await user.save();
            res.status(301).json({message: 'Successful!', status: true});
        } catch (error) {
            res.status(501).json({message: 'Failed!', status: false});
            next(error)
        }
    }
    
    uploadStorys(req, res, next) {
        
    }

}

export default new Profile;
