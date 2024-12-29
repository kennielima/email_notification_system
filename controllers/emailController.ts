import { getPendingEmails, scheduleEmailModel } from "../models/EmailModel";



const scheduleEmail = async (req: any, res: any) => {
    const { recipient_email, subject, body, scheduled_time } = req.body;
    try {
        const result = await scheduleEmailModel(recipient_email, subject, body, scheduled_time)
        res.status(201).json({ message: 'Email scheduled', result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to schedule email' });
    }
};

const getPendingEmail = async (req: any, res: any) => {
    try {
        const result = await getPendingEmails()
        res.status(201).json({ message: 'Pending Emails', result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to schedule email' });
    }
};


export { scheduleEmail, getPendingEmail }