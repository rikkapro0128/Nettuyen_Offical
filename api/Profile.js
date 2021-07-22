import { Account, Storys, Chapter, } from '../models/account.js';
import formidable from 'formidable';
import fs from 'fs';
import uniqid from 'uniqid';

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
    
    async uploadStory(req, res, next) {
        let idUser = req.params.id_user;
        let idStory = uniqid();
        fs.mkdirSync(`d:\\DATA_IMAGE${process.env.DIR_STORY}\\${idUser}\\${idStory}`, { recursive: true });
        console.log(req.body)
        const user = await Account.findById(idUser).exec();
        const story = new Storys({
            name: req.body.details.name,
            type: req.body.type.join('-'),
            owner: idUser,
            nameDir: `\\${idStory}`,
        });
        user.storys.push(story._id);
        await user.save();
        await story.save();
        res.status(301).json({ result: 'OK!' });
    }
    
    async uploadChapter(req, res, next) {
        let idStory = req.params.id_story;
        const idUser = res.locals.INFO_USER._id;
        let idChapter = uniqid();
        const story = await Storys.findById(idStory).populate('listChapter').exec();
        const pathStorageImage = `d:\\DATA_IMAGE${process.env.DIR_STORY}\\${idUser}${story.nameDir}\\chapter-${story.chapterPresent + 1}-${idChapter}`;
        const linkOffical = `${process.env.DIR_STORY}\\${idUser}${story.nameDir}\\chapter-${story.chapterPresent + 1}-${idChapter}`;
        fs.mkdirSync(pathStorageImage, { recursive: true });
        const form = formidable({
            multiples: true,
            uploadDir: pathStorageImage,
            keepExtensions: true,
        });
        form.parse(req, async (err, fields, files) => {
            const dataReq = JSON.parse(fields.data_info);
            const nameChapter = [];
            if (err) {
                next(err);
                return;
            }
            files.chapter.forEach((item, index) => {
                const path = `${pathStorageImage}\\index-${index}-${idChapter}.${item.type.split('/')[1]}`;
                fs.rename(item.path, path, function(err) {
                    if ( err ) next(err);
                });
                nameChapter.push({name: `index-${index}-${idChapter}.${item.type.split('/')[1]}`, path});
            })
            const newChapter = new Chapter({
                name: dataReq.details.name,
                number: story.chapterPresent + 1,
                storyOwner: idStory,
                nameDir: `\\chapter-${story.chapterPresent + 1}-${idChapter}`,
                listImage: files.chapter.map((item, index) => {
                    return {
                        fileName: nameChapter[index].name, 
                        path: `${linkOffical}\\${nameChapter[index].name}`, 
                        size: item.size,
                        ext: item.type,
                    };
                }),
            });
            story.listChapter.push(newChapter._id);
            await newChapter.save();
            await story.save();
        });
        res.status(301).json({ result: 'OK!' });
    }

    async uploadAvatarCover(req, res, next) {
        const idStory = req.params.id_story;
        const idUser = res.locals.INFO_USER._id;
        const story = await Storys.findById(idStory);
        const pathStorageImage = `d:\\DATA_IMAGE\\${process.env.INTRO_STORY}\\${idUser}\\${story.nameDir.split('\\')[1]}`;
        const linkOffical = `\\${process.env.INTRO_STORY}\\${idUser}\\${story.nameDir.split('\\')[1]}`;
        fs.mkdirSync(pathStorageImage, { recursive: true });
        const form = formidable({
            multiples: true,
            uploadDir: pathStorageImage,
            keepExtensions: true,
        });
        form.parse(req, async (err, fields, files) => {
            const dataReq = JSON.parse(fields.position);
            if(files.avatar) {
                fs.rename(files.avatar.path, `${pathStorageImage}\\avatar.${files.avatar.type.split('/')[1]}`, function(err) {
                    if ( err ) next(err);
                });
            }
            if(files.cover) {
                fs.rename(files.cover.path, `${pathStorageImage}\\cover.${files.cover.type.split('/')[1]}`, function(err) {
                    if ( err ) next(err);
                });
            }
            story.avatar = {
                path: `${linkOffical}\\avatar.${files.avatar.type.split('/')[1]}`,
                position: dataReq.avatar,
            }
            story.cover = {
                path: `${linkOffical}\\cover.${files.cover.type.split('/')[1]}`,
                position: dataReq.cover,
            }
            await story.save();
        })
        res.status(301).json({ result: 'OK!' });
    }

}

export default new Profile;
