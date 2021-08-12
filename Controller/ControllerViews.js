import { Account, Storys, Chapter, } from '../models/account.js';
import helper from '../helper/handleApi.js';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

class Views {

    async home(req, res, next) {
        let storys = await Storys.find({ state: {$not: { $eq: 'removed' } } }).exec();
        // console.log(storys)
        res.render('home', {
            storys: storys.map((item) => {
                return {
                    id: item._id.toString(),
                    name: item.name,
                    chapter: item.chapterPresent.toString(),
                    rate: 'null',
                    image: item.avatar.path,
                }
            }),
        });
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
    notFound(req, res, next) {
        res.render('notFound');
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
        const idUser = res.locals.INFO_USER._id;
        let info = await helper.getInfoAccount(idUser);
        info = info.toObject();
        let data = await Storys.find({ 
            owner: idUser,
            state: { $not: { $eq: 'removed' } }
        }).populate('listChapter').exec();
        res.render('profile', {
            info,
            listStory: data,
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

    async editYourStory(req, res, next) {
        const idStory = req.params.id_story;
        let info = await helper.getInfoAccount(res.locals.INFO_USER._id);
        info = info.toObject();
        let data = await Storys.findOne({ _id: idStory }).populate('listChapter').exec();
        res.render('profile', {
            info,
            story: { 
                data,
                path: { 
                    avatar: data.avatar.path,
                    cover: data.cover.path,
                    avatarPosition: data.avatar.position,
                    coverPosition: data.cover.position,
                },
                type: data.type.split('-'),
                nextChapter: data.chapterPresent + 1,
                decription: 'No decription!', // no-data
                release: 2020, // no-data
            },
            EDIT_YOUR_STORYS: true,
        });
    }

    async removeYourStory(req, res, next) {
        const idStory = req.body;
        const story = await Storys.updateMany({ _id: { $in: idStory } }, { $set: { state: 'removed', } }).exec();
        console.log(story)
        res.status(301).json({ result: 'success' });
    }

    async story(req, res, next) {
        const idStory = req.params.id_story;
        let data = await Storys.findById(idStory).populate('listChapter').exec();
        res.render('story', {
            story: {
                id: data._id,
                name: data.name,
                path: { 
                    avatar: data.avatar.path || undefined,
                    cover: data.cover.path || undefined,
                    avatarPosition: data.avatar.position || undefined,
                    coverPosition: data.cover.position || undefined,
                },
                type: data.type.split('-'),
                decription: data.decription || undefined,
                chapter: data.listChapter.length ? data.listChapter.map((item) => {
                    return {
                        id: item._id,
                        name: item.name,
                        number: item.number,
                        dateUpdate: item.dateUpdate,
                    }
                }) : undefined,
            }
        });
    }

    async chapter(req, res, next) {
        const idStory = req.params.id_story;
        const indexChapter = req.params.chapter.split('-')[1];
        let story = await Storys.findById(idStory).populate({
            path: 'listChapter',
            match: { number: indexChapter },
        }).exec();
        if(!story.listChapter.length) { 
            res.status(404).redirect('/404-not-found') 
        }else {
            story = {
                id: story._id,
                name: story.name,
                maxChapter: story.chapterPresent,
                chapter: { name: story.listChapter[0].name, number: story.listChapter[0].number },
                listImage: story.listChapter[0].listImage.map((item) => {
                    return {
                        path: item.path.includes('d:\\DATA_IMAGE') ? item.path.split('d:\\DATA_IMAGE')[1] : item.path,
                    };
                }),
            }
            // res.json({story});
            res.render('chapter', {
                story,
            });
        }
    }

}

export default new Views;