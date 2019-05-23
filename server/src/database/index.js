import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL;

const pool = new Pool({ connectionString });

pool.on('connect', () => {
  console.log('Connected to database');
});



export default pool;