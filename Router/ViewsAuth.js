import express from 'express';
import ControllerViews from '../Controller/ControllerViews.js';
import Profile from '../api/Profile.js';
import multer from 'multer';

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
const optionAvatarMulter = multer({ storage: storageAvatar });

router.get('/info', ControllerViews.profile);
router.get('/your-storys', ControllerViews.yourStorys);
router.get('/add-your-storys', ControllerViews.addYourStory);
router.get('/edit-your-storys/:id_user', ControllerViews.editYourStory);
router.get('/change-password', ControllerViews.changePasswordView);
router.put('/change-password', ControllerViews.changePassword);
router.put('/update/info/:id_user', optionAvatarMulter.single('avatar'), Profile.updateInfoAccount);
router.post('/upload-story/:id_user', Profile.uploadStory);
router.post('/upload-chapter/:id_story', Profile.uploadChapter);
router.post('/upload-avatar-cover/:id_story', Profile.uploadAvatarCover);

export default router;
