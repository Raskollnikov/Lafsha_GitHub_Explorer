import express from 'express';
import { explore } from '../controllers/explore.controller.js';
import { ensureAuthenticated } from '../middleware/ensureAuthenticated.js';

const router = express.Router();


router.get('/repos/:language',ensureAuthenticated, explore)


export default router;