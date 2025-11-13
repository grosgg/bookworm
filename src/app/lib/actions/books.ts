'use server';

import { revalidatePath } from 'next/cache';
import { v4 as uuidv4 } from 'uuid';
import { Pool } from 'pg';
import { requireSession } from '@/app/lib/auth';
import { getTranslations } from 'next-intl/server';
import { ActionStateType, BookSchema } from '@/app/lib/definitions';

const editBookSchema = BookSchema.pick({ media: true, status: true, notes: true, bookshelfId: true });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
  ssl: { rejectUnauthorized: false },
});

export async function addBookToCollectionAction(_previousState: ActionStateType, formData: FormData) {
    const session = await requireSession();
    const t = await getTranslations('actions.book');
  
    try {
      await pool.query(
        'INSERT INTO book ("id", "userId", "bookshelfId", title, author, isbn, "coverUrl", "pages", "year", "publisher", "description", "language") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)',
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
          formData.get('description'),
          formData.get('language')
        ]
      );
  
      return { success: true, message: t('addedSuccessfully'), toast: true, redirect: '' };
    } catch (error) {
      console.error('Database Error:', error);
      return { success: false, message: t('failedToAdd'), toast: true, redirect: '' };
    }
  }
  
  export async function editBookAction(id: string, _previousState: ActionStateType, formData: FormData) {
    const t = await getTranslations('actions.book');
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
      return { success: true, message: t('updatedSuccessfully'), toast: true, redirect: `/books/${id}` };
    } catch (error) {
      console.error('Database Error:', error);
      return { success: false, message: t('failedToUpdate'), toast: true, redirect: '' };
    }
  }
  
  export async function deleteBookAction(id: string) {
    const session = await requireSession();
    const t = await getTranslations('actions.book');
  
    try {
      await pool.query('DELETE FROM book WHERE id = $1 AND "userId" = $2', [id, session.user.id]);
      revalidatePath(`/books/${id}`);
      return { success: true, message: t('deletedSuccessfully'), toast: true, redirect: '' };
    } catch (error) {
      console.error('Database Error:', error);
      return { success: false, message: t('failedToDelete'), toast: true, redirect: '' };
    }
  }