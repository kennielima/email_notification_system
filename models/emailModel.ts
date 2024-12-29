import pool from "../utils/db"

async function scheduleEmailModel(recipientEmail: string, subject: string, body: string, scheduledTime: string) {
    const result = await pool.query(
        `INSERT INTO scheduled_emails (recipient_email, subject, body, scheduled_time) 
            VALUES ($1, $2, $3, $4) 
            RETURNING *`,
        [recipientEmail, subject, body, scheduledTime]
    )
    console.log("result", result.rows[0])
    return result.rows[0];
}

async function getPendingEmails() {
    const result = await pool.query(
        `SELECT * FROM scheduled_emails
            WHERE status = $1 
            AND
            scheduled_time >= NOW()
            AT TIME ZONE 'Africa/Lagos';`,
        ['pending']
    );
    return result.rows;
}

async function updateEmailStatus(emailId: string, status: string, attempts = 0) {
    await pool.query(
        `UPDATE scheduled_emails 
            SET status = $1, 
            attempts = $2
            WHERE id = $3
             RETURNING *`,
        ['sent', attempts, emailId]
    );
}

export { scheduleEmailModel, getPendingEmails, updateEmailStatus };