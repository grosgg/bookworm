export type UserType = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string;
  createdAt: string;
  updatedAt: string;
};

export type BookshelfType = {
  id: string;
  userId: string;
  name: string;
  visibility: 'public' | 'private';
  createdAt: string;
  updatedAt: string;
};

export type BookType = {
  id: string;
  userId: string;
  bookshelfId: string;
  title: string;
  author: string;
  isbn: string;
  status: 'reading' | 'read' | 'not_read';
  coverUrl: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
};