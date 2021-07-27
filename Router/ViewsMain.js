import express from 'express';
let router = express.Router();
import ControllerViews from '../Controller/ControllerViews.js';

router.get('/', ControllerViews.home);
router.get('/404-not-found', ControllerViews.notFound);
router.get('/story/:id_story', ControllerViews.story);
router.get('/story/:id_story/:chapter', ControllerViews.chapter);
router.get('/views/signin', ControllerViews.signin);
router.get('/views/signup', ControllerViews.signup);

export default router;