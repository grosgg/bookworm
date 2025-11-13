import { Pool } from 'pg';
import { BookshelfType } from '@/app/lib/definitions';
import { requireSession } from '@/app/lib/auth';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
  ssl: { rejectUnauthorized: false },
});

export async function getBookshelfById(id: string) {
  const session = await requireSession();
  try {
    const result = await pool.query<BookshelfType>('SELECT * FROM bookshelf WHERE id = $1 AND ("userId" = $2 OR visibility = $3)', [id, session.user.id, 'public']);
    return result.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch bookshelf data.');
  }
}

export async function getBookshelvesByUserId(userId: string, page: number) {
  const session = await requireSession();
  try {
    const result = await pool.query<BookshelfType>('SELECT * FROM bookshelf WHERE "userId" = $1 AND ("userId" = $2 OR visibility = $3) ORDER BY "updatedAt" DESC LIMIT $4 OFFSET $5', [userId, session.user.id, 'public', 5, (page - 1) * 5]);
    return result.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch bookshelves data.');
  }
}

export async function getAllBookshelvesByUserId(userId: string) {
  const session = await requireSession();
  try {
    const result = await pool.query<BookshelfType>('SELECT * FROM bookshelf WHERE "userId" = $1 AND ("userId" = $2 OR visibility = $3) ORDER BY "updatedAt" DESC', [userId, session.user.id, 'public']);
    return result.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch bookshelves data.');
  }
}

export async function getBookshelvesCountForCurrentUser(userId: string) {
  try {
    const result = await pool.query<{ count: number }>('SELECT COUNT(*) FROM bookshelf WHERE "userId" = $1', [userId]);
    return result.rows[0].count;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch bookshelves count data.');
  }
}
