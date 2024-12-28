import { getPendingEmails, scheduleEmailModel } from "../models/EmailModel";

const scheduleEmail = async (req, res) => {
    const { userId, recipient_email, subject, body, scheduled_time } = req.body;
    try {
        const result = await scheduleEmailModel(userId, recipient_email, subject, body, scheduled_time)
        res.status(201).json({ message: 'Email scheduled', email: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to schedule email' });
    }
};

const getPendingEmail = async (req, res) => {
    try {
        const result = await getPendingEmails()
        res.status(201).json({ message: 'Pending Emails', emails: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to schedule email' });
    }
};
const updateEmail = async (req, res) => {
    const { emailId, status } = req.body;
    try {
        const result = await updateEmail(emailId, status)
        res.status(201).json({ message: 'Updated Email', emails: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to schedule email' });
    }
};

export { scheduleEmail, getPendingEmail, updateEmail }