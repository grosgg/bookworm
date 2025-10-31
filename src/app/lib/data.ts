import { Pool } from 'pg';
import { UserType, BookType, BookshelfType } from './definitions';
import { v4 as uuidv4 } from 'uuid';

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

export async function createDefaultBook(userId: string) {
  try {
    const id = uuidv4();
    const result = await pool.query<BookType>(
      'INSERT INTO book (id, "userId", title, author, isbn, status, "coverUrl", notes, "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW()) RETURNING *',
      [id, userId, "Le Capital", "Karl Marx", "9782070355747", "not_read", "https://images.isbndb.com/covers/3421723482925.jpg", "A book that everybody talks about but nobody reads."]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw error;
  }
}

export async function getBookshelvesByUserId(userId: string) {
  try {
    const result = await pool.query<BookshelfType>('SELECT * FROM bookshelf WHERE "userId" = $1', [userId]);
    return result.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch bookshelves data.');
  }
}

export async function getBooksByBookshelfId(bookshelfId: string) {
  try {
    const result = await pool.query<BookType>('SELECT * FROM book WHERE "bookshelfId" = $1', [bookshelfId]);
    return result.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch books data.');
  }
}
