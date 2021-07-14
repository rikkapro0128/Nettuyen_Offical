import express from 'express';
import ControllerViews from '../Controller/ControllerViews.js';
import Profile from '../api/Profile.js';
import multer from 'multer';
import uniqid from 'uniqid';
import helper from '../helper/handleApi.js';
import fs from 'fs';
let router = express.Router();
const storageAvatar = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `d:\\DATA_IMAGE${process.env.DIR_AVATAR}`);
    },
    filename: function (req, file, cb) {
        //console.log({req, file})
        const ext = file.originalname.split('.')[1];
        cb(null, `${file.fieldname}-${req.params.id_user}.${ext}`);
    }
});
const storageStory = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `${req.pathStory}`);
    },
    filename: function (req, file, cb) {
        const ext = file.originalname.split('.')[1];
        cb(null, `${file.fieldname}-${uniqid()}.${ext}`);
    }
});
const optionAvatarMulter = multer({ storage: storageAvatar });
const optionStoryMulter = multer({ storage: storageStory });

router.get('/info', ControllerViews.profile);
router.get('/your-storys', ControllerViews.yourStorys);
router.get('/add-your-storys', ControllerViews.addYourStory);
router.get('/change-password', ControllerViews.changePasswordView);
router.put('/change-password', ControllerViews.changePassword);
router.put('/update/info/:id_user', optionAvatarMulter.single('avatar'), Profile.updateInfoAccount);
router.post('/upload-story/:id_user', helper.createMyStory, optionStoryMulter.array('story', 100), Profile.uploadStorys);

export default router;
