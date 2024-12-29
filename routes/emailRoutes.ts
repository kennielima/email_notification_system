import express from 'express';
import { getPendingEmail, scheduleEmail } from '../controllers/emailController';
const router = express.Router();

router.post('/schedule', scheduleEmail);
router.get('/getmails', getPendingEmail);

export default router;
