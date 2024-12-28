import express from 'express';
import { getPendingEmail, scheduleEmail, updateEmail } from '../controllers/emailController';
const router = express.Router();

router.post('/schedule', scheduleEmail);
router.post('/getmails', getPendingEmail);
router.post('/update', updateEmail);

export default router;
