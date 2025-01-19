import express from 'express';
import { explore } from '../controllers/explore.controller.js';

const router = express.Router();


router.get('/repos/:language',explore)


export default router;