import express from 'express';
import { getLikes, getUserProfileAndRepos,LikeProfile } from '../controllers/user.controller.js';
import { ensureAuthenticated } from '../middleware/ensureAuthenticated.js';

const router = express.Router();


router.get('/profile/:userName',getUserProfileAndRepos)
router.get('/likes',ensureAuthenticated,getLikes)
router.post('/like/:userName',ensureAuthenticated,LikeProfile)

export default router;