'use server';

import { revalidatePath } from 'next/cache';
import { v4 as uuidv4 } from 'uuid';
import { Pool } from 'pg';
import { requireSession } from './auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ActionStateType, BookshelfSchema, BookSchema } from './definitions';

const createBookshelfSchema = BookshelfSchema.pick({ name: true, visibility: true });
const editBookshelfSchema = BookshelfSchema.pick({ name: true, visibility: true });
const editBookSchema = BookSchema.pick({ media: true, status: true, notes: true, bookshelfId: true });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
  ssl: { rejectUnauthorized: false },
});

export async function createBookshelfAction(_previousState: ActionStateType, formData: FormData) {
  const session = await requireSession();

  const { name, visibility } = createBookshelfSchema.parse({
    name: formData.get('name'),
    visibility: formData.get('visibility'),
  });
  const userId = session.user.id;

  try {
    await pool.query(
      'INSERT INTO bookshelf (id, "userId", name, visibility, "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, NOW(), NOW())',
      [uuidv4(), userId, name, visibility]
    );

    return { success: true, message: 'Bookshelf created successfully.', toast: true, redirect: '/bookshelves' };
  } catch (error) {
    console.error('Database Error:', error);
    return { success: false, message: 'Failed to create bookshelf.', toast: true, redirect: '' };
  }
}

export async function editBookshelfAction(id: string, _previousState: ActionStateType, formData: FormData) {
  const { name, visibility } = editBookshelfSchema.parse({
    name: formData.get('name'),
    visibility: formData.get('visibility'),
  });

  try {
    await pool.query(
      'UPDATE bookshelf SET name = $1, visibility = $2, "updatedAt" = NOW() WHERE id = $3',
      [name, visibility, id]
    );
    revalidatePath(`/bookshelves/${id}/edit`);
    return { success: true, message: 'Bookshelf updated successfully.', toast: true, redirect: `/bookshelves/` };
  } catch (error) {
    console.error('Database Error:', error);
    return { success: false, message: 'Failed to update bookshelf.', toast: true, redirect: '' };
  }
}

export async function addBookToCollectionAction(formData: FormData) {
  const session = await requireSession();

  await pool.query(
    'INSERT INTO book ("id", "userId", "bookshelfId", title, author, isbn, "coverUrl", "pages", "year", "publisher", "language") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
    [
      uuidv4(),
      session.user.id,
      formData.get('bookshelfId'),
      formData.get('title'),
      formData.get('author'),
      formData.get('isbn'),
      formData.get('coverUrl'),
      formData.get('pages'),
      formData.get('year'),
      formData.get('publisher'),
      formData.get('language')
    ]
  );

  revalidatePath('/bookshelves');
  redirect('/bookshelves');
}

export async function editBookAction(id: string, _previousState: ActionStateType, formData: FormData) {
  const { media, status, notes, bookshelfId } = editBookSchema.parse({
    media: formData.get('media'),
    status: formData.get('status'),
    notes: formData.get('notes'),
    bookshelfId: (formData.get('bookshelfId') as string)?.length > 0 ? formData.get('bookshelfId') : null,
  });

  try {
    await pool.query(
      'UPDATE book SET media = $1, status = $2, notes = $3, "bookshelfId" = $4, "updatedAt" = NOW() WHERE id = $5',
      [media, status, notes, bookshelfId, id]
    );
    revalidatePath(`/books/${id}/edit`);
    return { success: true, message: 'Book updated successfully.', toast: true, redirect: `/books/${id}` };
  } catch (error) {
    console.error('Database Error:', error);
    return { success: false, message: 'Failed to update book.', toast: true, redirect: '' };
  }
}

export async function deleteBookAction(id: string) {
  const session = await requireSession();

  try {
    await pool.query('DELETE FROM book WHERE id = $1 AND "userId" = $2', [id, session.user.id]);
    revalidatePath(`/books/${id}`);
    return { success: true, message: 'Book deleted successfully.', toast: true, redirect: '/books' };
  } catch (error) {
    console.error('Database Error:', error);
    return { success: false, message: 'Failed to delete book.', toast: true, redirect: '' };
  }
}

export async function setLocaleAction(locale: string) {
  const store = await cookies();
  store.set('locale', locale);
}