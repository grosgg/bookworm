import { Pool } from 'pg';
import { UserType, BookType, BookshelfType } from './definitions';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL!,
  ssl: { rejectUnauthorized: false },
});

export async function getUserByGoogleId(googleId: string) {
  try {
    const result = await pool.query<UserType>('SELECT * FROM users WHERE google_id = $1', [googleId]);
    return result.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch user data.');
  }
}

export async function getBookshelvesByUserId(userId: string) {
  try {
    const result = await pool.query<BookshelfType>('SELECT * FROM bookshelves WHERE user_id = $1', [userId]);
    return result.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch bookshelf data.');
  }
}

export async function getBooksByBookshelfId(bookshelfId: string) {
  try {
    const result = await pool.query<BookType>('SELECT * FROM books WHERE bookshelf_id = $1', [bookshelfId]);
    return result.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch books data.');
  }
}
