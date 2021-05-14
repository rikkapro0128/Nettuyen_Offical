import express from 'express';
let router = express.Router();
import ControllerViews from '../Controller/ControllerViews.js';
import callApi from '../api/Sign.js';

router.get('/', ControllerViews.home);
router.post('/signin', callApi.signin);
router.post('/signup', callApi.signup);
router.post('/signout', callApi.signout);

export default router;
