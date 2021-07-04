import express from 'express';
import ControllerViews from '../Controller/ControllerViews.js';
import Profile from '../api/Profile.js';
import multer from 'multer';
let router = express.Router();
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `e:\\DATA_IMAGE${process.env.DIR_AVATAR}`);
    },
    filename: function (req, file, cb) {
        //console.log({req, file})
        const ext = file.originalname.split('.')[1];
        cb(null, `${file.fieldname}-${req.params.id_user}.${ext}`);
    }
});
const optionMulter = multer({ storage: storage });

router.get('/info', ControllerViews.profile);
router.get('/your-storys', ControllerViews.yourStorys);
router.get('/add-your-storys', ControllerViews.addYourStory);
router.get('/change-password', ControllerViews.changePasswordView);
router.put('/change-password', ControllerViews.changePassword);
router.put('/update/info/:id_user', optionMulter.single('avatar'), Profile.updateInfoAccount);

export default router;
