import express from 'express';
let router = express.Router();
import callApi from '../api/Sign.js';

router.post('/signin', callApi.signin);
router.post('/signup', callApi.signup);
router.post('/signout', callApi.signout);

export default router;
