import pool from "../utils/db"

async function scheduleEmailModel(userId: string, recipientEmail: string, subject: string, body: string, scheduledTime: string) {
    const result = await pool.query(
        `INSERT INTO scheduled_emails (userId, recipient_email, subject, body, scheduled_time) 
            VALUES ($1, $2, $3, $4, $5) 
            RETURNING *`,
        [userId, recipientEmail, subject, body, scheduledTime]
    )
    return result.rows[0];
}

async function getPendingEmails() {
    const result = await pool.query(
        `SELECT * FROM scheduled_emails
            WHERE status = $1 
            AND
            scheduled_time <= NOW()`,
        ['pending']
    );
    return result.rows;
}

async function updateEmailStatus(emailId, status, attempts = 0) {
    await pool.query(
        `UPDATE scheduled_emails 
            SET status = $1, 
            attempts = $2
            WHERE id = $3`,
        ['sent', attempts, emailId]
    );
}

export { scheduleEmailModel, getPendingEmails, updateEmailStatus };