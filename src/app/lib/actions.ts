'use server';

import { revalidatePath } from 'next/cache';
import { v4 as uuidv4 } from 'uuid';
import { Pool } from 'pg';
import { requireSession } from './auth';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ActionStateType, BookshelfSchema } from './definitions';

const createBookshelfSchema = BookshelfSchema.pick({ name: true, visibility: true });
const editBookshelfSchema = BookshelfSchema.pick({ name: true, visibility: true });

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

export async function setLocaleAction(locale: string) {
  const store = await cookies();
  store.set('locale', locale);
}