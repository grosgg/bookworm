import { getBooksFromDefaultBookshelf } from "@/app/lib/data";
import { requireSession } from "@/app/lib/auth";
import { BookType } from "@/app/lib/definitions";
import BookCard from "@/app/ui/books/list-card";
import { getTranslations } from 'next-intl/server';
import VisibilityPill from "@/app/ui/books/visibility-pill";

export default async function DefaultBookshelfPage() {
  const t = await getTranslations('pages.defaultBookshelf');
  const tBookshelves = await getTranslations('pages.bookshelves');
  const session = await requireSession();

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
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}