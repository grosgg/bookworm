import { getBooksFromDefaultBookshelf } from "@/app/lib/data";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { BookType } from "@/app/lib/definitions";
import BookCard from "@/app/ui/books/book-card";
import { getTranslations } from 'next-intl/server';
import VisibilityPill from "@/app/ui/books/visibility-pill";

export default async function DefaultBookshelfPage() {
  const t = await getTranslations('pages.defaultBookshelf');
  const tBookshelves = await getTranslations('pages.bookshelves');
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) { throw new Error('Unauthorized'); }

  const userId = session.user.id;
  const books: BookType[] = await getBooksFromDefaultBookshelf(userId);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-3xl font-bold">{t('title')}</h1>
        <VisibilityPill visibility="private" />
        <p className="text-md font-medium">{tBookshelves('bookCount', { count: books.length })}</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {books.map((book) => (
          <BookCard key={book.id} book={book} onSearch={false} />
        ))}
      </div>
    </div>
  );
}