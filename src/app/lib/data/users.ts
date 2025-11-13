import { Pool } from 'pg';
import { UserType } from '@/app/lib/definitions';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
  ssl: { rejectUnauthorized: false },
});

export async function getUserByGoogleId(googleId: string) {
  try {
    const result = await pool.query<UserType>('SELECT * FROM "user" WHERE google_id = $1', [googleId]);
    return result.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch user data.');
  }
}
