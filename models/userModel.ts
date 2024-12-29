import pool from "../utils/db";

async function createUser (email: Promise<string>, hashedPassword: string) {
    const result = await pool.query(
        'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
        [email, hashedPassword]
    )
    console.log(result)
    return result.rows[0];
}

async function findUserByEmail (email: Promise<string>) {
    const result = await pool.query(
        'SELECT * FROM users WHERE EMAIL = $1',
        [email]
    )
    return result.rows[0];
}

export { createUser, findUserByEmail }