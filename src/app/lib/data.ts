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

export async function getBooksByBookshelfId(bookshelfId: string, page: number) {
  const session = await requireSession();
  try {
    const result = await pool.query<BookType>('SELECT book.* FROM book LEFT JOIN bookshelf ON book."bookshelfId" = bookshelf.id WHERE book."bookshelfId" = $1 AND (bookshelf.visibility = $2 OR book."userId" = $3) ORDER BY book."updatedAt" DESC LIMIT $4 OFFSET $5', [bookshelfId, 'public', session.user.id, 4, (page - 1) * 4]);
    return result.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch books data.');
  }
}

export async function getBooksCountForBookshelf(bookshelfId: string) {
  const session = await requireSession();
  try {
    const result = await pool.query<{ count: number }>('SELECT COUNT(*) FROM book LEFT JOIN bookshelf ON book."bookshelfId" = bookshelf.id WHERE book."bookshelfId" = $1 AND (bookshelf.visibility = $2 OR book."userId" = $3)', [bookshelfId, 'public', session.user.id]);
    return result.rows[0].count;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch books count data.');
  }
}

export async function getBooksFromDefaultBookshelf(page: number) {
  const session = await requireSession();
  try {
    const result = await pool.query<BookType>('SELECT * FROM book WHERE "bookshelfId" IS NULL AND "userId" = $1 ORDER BY "updatedAt" DESC LIMIT $2 OFFSET $3', [session.user.id, 4, (page - 1) * 4]);
    return result.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch books data.');
  }
}

export async function getAllBooksFromDefaultBookshelf() {
  const session = await requireSession();
  try {
    const result = await pool.query<BookType>('SELECT * FROM book WHERE "bookshelfId" IS NULL AND "userId" = $1 ORDER BY "updatedAt" DESC', [session.user.id]);
    return result.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch books data.');
  }
}

export async function getBooksCountForDefaultBookshelf() {
  const session = await requireSession();
  try {
    const result = await pool.query<{ count: number }>('SELECT COUNT(*) FROM book WHERE "bookshelfId" IS NULL AND "userId" = $1', [session.user.id]);
    return result.rows[0].count;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch books count data.');
  }
}
export async function getBooksForCurrentUser(query: string, page: number) {
  const session = await requireSession();
  try {
    const result = await pool.query<BookType>('SELECT * FROM book WHERE "userId" = $1 AND (title ILIKE $2 OR author ILIKE $2) ORDER BY "updatedAt" DESC LIMIT $3 OFFSET $4', [session.user.id, `%${query}%`, 4, (page - 1) * 4]);
    return result.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch books data.');
  }
}

export async function getReadingBooksForCurrentUser() {
  const session = await requireSession();
  try {
    const result = await pool.query<BookType>('SELECT * FROM book WHERE "userId" = $1 AND "status" = $2 ORDER BY "updatedAt" DESC', [session.user.id, 'reading']);
    return result.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch reading books data.');
  }
}

export async function getBooksCountForCurrentUser(query: string) {
  const session = await requireSession();
  try {
    const result = await pool.query<{ count: number }>('SELECT COUNT(*) FROM book WHERE "userId" = $1 AND (title ILIKE $2 OR author ILIKE $2)', [session.user.id, `%${query}%`]);
    return result.rows[0].count;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch books count data.');
  }
}

export async function getReadBooksCountForCurrentUser() {
  const session = await requireSession();
  try {
    const result = await pool.query<{ count: number }>('SELECT COUNT(*) FROM book WHERE "userId" = $1 AND "status" = $2', [session.user.id, 'read']);
    return result.rows[0].count;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch read count data.');
  }
}

export async function getBookById(id: string) {
  try {
    const session = await requireSession();
    const result = await pool.query<BookType>('SELECT book.* FROM book LEFT JOIN bookshelf ON book."bookshelfId" = bookshelf.id WHERE book.id = $1 AND (bookshelf.visibility = $2 OR book."userId" = $3)', [id, 'public', session.user.id]);
    return result.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch book data.');
  }
}

export async function isBookInCollection(isbn: string) {
  try {
    const session = await requireSession();
    const result = await pool.query<{ count: number }>('SELECT COUNT(*) FROM book WHERE "userId" = $1 AND isbn = $2', [session.user.id, isbn]);
    return result.rows[0].count > 0;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to check if book is in collection.');
  }
}

export async function searchBooks(searchType: 'intitle' | 'isbn', query: string, lang: 'en' | 'fr' | 'ja', page: number) {
  try {
    const params = new URLSearchParams({
      q: `${searchType}:${query}`,
      printType: 'books',
      langRestrict: lang,
      startIndex: ((page - 1) * 4).toString(),
      maxResults: '4',
      key: process.env.GOOGLE_API_KEY!,
    });
    const result = await fetch(
      `https://www.googleapis.com/books/v1/volumes?${params.toString()}`,
      {
        headers: { 'referer': process.env.NEXT_PUBLIC_BASE_URL! },
      }
    );
    const data = await result.json();

    const volumes = data.items?.map((item: { volumeInfo: VolumeInfoType }) => {
      const isbn = item.volumeInfo.industryIdentifiers?.find((identifier: IndustryIdentifierType) => identifier.type === 'ISBN_13' || identifier.type === 'ISBN_10')?.identifier;
      return {
        title: item.volumeInfo.title,
        author: item.volumeInfo.authors?.length > 0 ? item.volumeInfo.authors[0] : undefined,
        isbn: isbn,
        coverUrl: item.volumeInfo.imageLinks?.thumbnail,
        year: item.volumeInfo.publishedDate?.split('-')[0],
        publisher: item.volumeInfo.publisher,
        description: item.volumeInfo.description,
        pages: item.volumeInfo.pageCount,
        language: item.volumeInfo.language,
      };
    });

    return { books: volumes, totalCount: data.totalItems };
  } catch (error) {
    console.error('Error:', error);
    return { books: [], totalCount: 0 };
  }
}