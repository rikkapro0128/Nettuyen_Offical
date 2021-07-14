import { Account, Storys, Chapter, } from '../models/account.js';

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
    
    async uploadStorys(req, res, next) {
        const data = JSON.parse(req.body.data_info);
        const idUser = req.params.id_user;
        const storyUser = await Account.findById(idUser).exec();
        const newChapter = new Chapter({
            number: data.details.chapter,
            listImage: (req.files).map((ele) => {
                return {
                    fileName: ele.filename,
                    path: ele.path, 
                    size: ele.size,
                    ext: ele.mimetype,
                }
            }),
        });
        const newStory = new Storys({
            name: data.details.name,
            type: data.type.join('-'),
        });
        newChapter.storyOwner = newStory._id;
        newStory.owner = storyUser._id;
        newStory.listChapter.push(newChapter._id);
        storyUser.storys.push(newStory._id);
        await newChapter.save();
        await newStory.save();
        await storyUser.save();
        //console.log({files: req.files, data});
        res.status(301).json({ result: 'OK!' });
    }

}

export default new Profile;
