import { z } from "zod";

export const UserSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type UserType = z.infer<typeof UserSchema>;

export const BookshelfSchema = z.object({
  id: z.uuid(),
  userId: z.uuid(),
  name: z.string().min(1),
  visibility: z.enum(['public', 'private']),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type BookshelfType = z.infer<typeof BookshelfSchema>;

export const BookSchema = z.object({
  id: z.uuid(),
  userId: z.uuid(),
  bookshelfId: z.uuid().optional(),
  title: z.string().min(1),
  author: z.string().min(1),
  isbn: z.string().optional(),
  status: z.enum(['reading', 'read', 'not_read']),
  coverUrl: z.url().optional(),
  notes: z.string().optional(),
  pages: z.number().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type BookType = z.infer<typeof BookSchema>;