import { Pool } from 'pg';
import { UserType, BookType, BookshelfType, VolumeInfoType, IndustryIdentifierType } from './definitions';
import { requireSession } from './auth';

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

export async function getBookshelvesByUserId(userId: string) {
  const session = await requireSession();
  try {
    const result = await pool.query<BookshelfType>('SELECT * FROM bookshelf WHERE "userId" = $1 AND ("userId" = $2 OR visibility = $3) ORDER BY "updatedAt" DESC', [userId, session.user.id, 'public']);
    return result.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch bookshelves data.');
  }
}

export async function getBooksByBookshelfId(bookshelfId: string) {
  try {
    const session = await requireSession();
    const result = await pool.query<BookType>('SELECT * FROM book LEFT JOIN bookshelf ON book."bookshelfId" = bookshelf.id WHERE book."bookshelfId" = $1 AND (bookshelf.visibility = $2 OR book."userId" = $3) ORDER BY book."updatedAt" DESC', [bookshelfId, 'public', session.user.id]);
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

export async function getBooksForCurrentUser() {
  const session = await requireSession();
  try {
    const result = await pool.query<BookType>('SELECT * FROM book WHERE "userId" = $1 ORDER BY "updatedAt" DESC', [session.user.id]);
    return result.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch books data.');
  }
}

export async function getBookById(id: string) {
  try {
    const session = await requireSession();
    const result = await pool.query<BookType>('SELECT * FROM book LEFT JOIN bookshelf ON book."bookshelfId" = bookshelf.id WHERE book.id = $1 AND (bookshelf.visibility = $2 OR book."userId" = $3)', [id, 'public', session.user.id]);
    return result.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch book data.');
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
