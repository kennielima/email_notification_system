import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
})

const test = async () => {
    try {
        const res = await pool.query('SELECT NOW()');
        console.log('Database is running and connected successfully!', res.rows[0]);
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}
test();
export default pool;