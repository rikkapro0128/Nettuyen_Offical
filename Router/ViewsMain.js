import express from 'express';
let router = express.Router();
import ControllerViews from '../Controller/ControllerViews.js';

router.get('/', ControllerViews.home);
router.get('/views/signin', ControllerViews.signin);
router.get('/views/signup', ControllerViews.signup);

export default router;