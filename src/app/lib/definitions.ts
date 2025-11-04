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
  bookshelfId: z.uuid().nullable(),
  title: z.string().min(1),
  author: z.string().optional(),
  isbn: z.string().optional(),
  pages: z.number().optional(),
  year: z.number().optional(),
  publisher: z.string().optional(),
  language: z.string().optional(),
  coverUrl: z.url().optional(),
  media: z.enum(['physical', 'digital']),
  status: z.enum(['reading', 'read', 'not_read']),
  notes: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type BookType = z.infer<typeof BookSchema>;

export const IndustryIdentifierSchema = z.object({ type: z.enum(['ISBN_10', 'ISBN_13']), identifier: z.string() });
export type IndustryIdentifierType = z.infer<typeof IndustryIdentifierSchema>;

export const VolumeInfoSchema = z.object({
  title: z.string(),
  authors: z.array(z.string()),
  industryIdentifiers: z.array(IndustryIdentifierSchema),
  imageLinks: z.object({ thumbnail: z.string().optional() }),
  publishedDate: z.string().optional(),
  publisher: z.string().optional(),
  pageCount: z.number().optional(),
  language: z.string().optional(),
});
export type VolumeInfoType = z.infer<typeof VolumeInfoSchema>;

export type ActionStateType = { success: boolean, message: string, toast: boolean, redirect: string };