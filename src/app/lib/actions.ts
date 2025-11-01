'use server';

import { revalidatePath } from 'next/cache';
import { v4 as uuidv4 } from 'uuid';
import { Pool } from 'pg';
import { auth } from './auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { BookshelfSchema } from './definitions';

const createBookshelfSchema = BookshelfSchema.pick({ name: true, visibility: true });
const editBookshelfSchema = BookshelfSchema.pick({ name: true, visibility: true });

export async function createBookshelfAction(formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    throw new Error('Unauthorized');
  }

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL!,
    ssl: { rejectUnauthorized: false },
  });

  const { name, visibility } = createBookshelfSchema.parse({
    name: formData.get('name'),
    visibility: formData.get('visibility'),
  });
  const userId = session.user.id;

  await pool.query(
    'INSERT INTO bookshelf (id, "userId", name, visibility, "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, NOW(), NOW())',
    [uuidv4(), userId, name, visibility]
  );
  revalidatePath('/bookshelves');
  redirect('/bookshelves');
}

export async function editBookshelfAction(id: string, formData: FormData) {
  const { name, visibility } = editBookshelfSchema.parse({
    name: formData.get('name'),
    visibility: formData.get('visibility'),
  });

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL!,
    ssl: { rejectUnauthorized: false },
  });

  await pool.query(
    'UPDATE bookshelf SET name = $1, visibility = $2, "updatedAt" = NOW() WHERE id = $3',
    [name, visibility, id]
  );
  revalidatePath('/bookshelves');
  redirect('/bookshelves');
}