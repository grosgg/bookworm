import { Pool } from 'pg';
import { UserType, BookType, BookshelfType, VolumeInfoType, IndustryIdentifierType } from './definitions';
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

export async function getBookshelfById(id: string) {
  try {
    const result = await pool.query<BookshelfType>('SELECT * FROM bookshelf WHERE id = $1', [id]);
    return result.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch bookshelf data.');
  }
}

export async function getBookshelvesByUserId(userId: string) {
  try {
    const result = await pool.query<BookshelfType>('SELECT * FROM bookshelf WHERE "userId" = $1 ORDER BY "updatedAt" DESC', [userId]);
    return result.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch bookshelves data.');
  }
}

export async function getBooksByBookshelfId(bookshelfId: string) {
  try {
    const result = await pool.query<BookType>('SELECT * FROM book WHERE "bookshelfId" = $1 ORDER BY "updatedAt" DESC', [bookshelfId]);
    return result.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch books data.');
  }
}

export async function getBooksFromDefaultBookshelf(userId: string) {
  try {
    const result = await pool.query<BookType>('SELECT * FROM book WHERE "bookshelfId" IS NULL AND "userId" = $1 ORDER BY "updatedAt" DESC', [userId]);
    return result.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch books data.');
  }
}

export async function getBooksByUserId(userId: string) {
  try {
    const result = await pool.query<BookType>('SELECT * FROM book WHERE "userId" = $1 ORDER BY "updatedAt" DESC', [userId]);
    return result.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch books data.');
  }
}

export async function searchBooks(searchType: 'intitle' | 'isbn', query: string, lang: 'en' | 'fr' | 'ja') {
  try {
    const params = new URLSearchParams({
      q: `${searchType}:${query}`,
      printType: 'books',
      langRestrict: lang,
      key: process.env.GOOGLE_API_KEY!,
    });
    const result = await fetch(
      `https://www.googleapis.com/books/v1/volumes?${params.toString()}`,
      {
        headers: { 'referer': process.env.NEXT_PUBLIC_BASE_URL! },
      }
    );
    const data = await result.json();
    if (data.totalItems === 0) {
      return [];
    }

    const volumes = data.items.map((item: { volumeInfo: VolumeInfoType }) => {
      const isbn = item.volumeInfo.industryIdentifiers?.find((identifier: IndustryIdentifierType) => identifier.type === 'ISBN_13')?.identifier;
      return {
        title: item.volumeInfo.title,
        author: item.volumeInfo.authors?.length > 0 ? item.volumeInfo.authors[0] : undefined,
        isbn: isbn,
        coverUrl: item.volumeInfo.imageLinks?.thumbnail,
        year: item.volumeInfo.publishedDate?.split('-')[0],
        publisher: item.volumeInfo.publisher,
        pages: item.volumeInfo.pageCount,
        language: item.volumeInfo.language,
      };
    });

    return volumes;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}
