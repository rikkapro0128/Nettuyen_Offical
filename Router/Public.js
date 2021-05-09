import express from 'express';
let router = express.Router();
import ControllerPublic from '../Controller/ControllerPublic.js';

router.get('/', ControllerPublic.home);

export default router;