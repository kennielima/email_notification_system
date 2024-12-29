import nodemailer from 'nodemailer';
import cron from 'node-cron';
import { getPendingEmails, updateEmailStatus } from '../models/EmailModel';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export const cronJob = cron.schedule('* * * * *', async () => {
    console.log('Cron job started at:', new Date().toISOString());

    const pendingEmails = await getPendingEmails();

    for (const email of pendingEmails) {
        console.log(`Processing email ID: ${email.id}`);
            console.log(`Scheduled time: ${email.scheduled_time}`);
            console.log(`Current time: ${new Date().toISOString()}`);

        try {
            await transporter.sendMail({
                from: process.env.SMTP_USER,
                to: email.recipient_email,
                subject: email.subject,
                text: email.body,
            });

            // await updateEmailStatus(email.id, 'sent');
        } catch (error) {
            console.error('Failed to send email:', error);
            const attempts = email.attempts + 1;
            if (attempts >= 3) {
                await updateEmailStatus(email.id, 'failed', attempts);
            } else {
                // await updateEmailStatus(email.id, 'pending', attempts);
            }
        }
    }
}, {
    scheduled: true,
    timezone: "Africa/Lagos"
});

export default cronJob;