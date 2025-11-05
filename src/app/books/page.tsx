import { getBooksForCurrentUser } from "@/app/lib/data";
import { BookType } from "@/app/lib/definitions";
import BookCard from "@/app/ui/books/list-card";
import { getTranslations } from 'next-intl/server';

export default async function BooksPage() {
  const t = await getTranslations('pages.books');

  const books = await getBooksForCurrentUser();
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">{t('title')}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {books.map((book: BookType) => <BookCard key={book.id} book={book} />)}
      </div>
    </div>
  );
}