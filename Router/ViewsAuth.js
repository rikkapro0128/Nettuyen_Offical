import express from 'express';
import ControllerViews from '../Controller/ControllerViews.js';
import Profile from '../api/Profile.js';
let router = express.Router();

router.get('/info', ControllerViews.profile);
router.put('/update/info/:id_user', Profile.updateInfoAccount);

export default router;
