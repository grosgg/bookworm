import { getBooksFromDefaultBookshelf, getBooksCountForDefaultBookshelf } from "@/app/lib/data";
import { BookType } from "@/app/lib/definitions";
import BookCard from "@/app/ui/books/list-card";
import { getTranslations } from 'next-intl/server';
import VisibilityPill from "@/app/ui/books/visibility-pill";
import Pagination from "@/app/ui/books/pagination";

export default async function DefaultBookshelfPage(props: { searchParams: Promise<{ page?: string }> }) {
  const t = await getTranslations('pages.defaultBookshelf');
  const tBookshelves = await getTranslations('pages.bookshelves');

  const searchParams = await props.searchParams;
  const page = Number(searchParams?.page) || 1;

  const [books, booksCount]: [BookType[], number] = await Promise.all([
    getBooksFromDefaultBookshelf(page),
    getBooksCountForDefaultBookshelf()
  ]);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-3xl font-bold">{t('title')}</h1>
        <VisibilityPill visibility="private" />
        <p className="text-md font-medium">{tBookshelves('bookCount', { count: booksCount })}</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
      {books.length > 0 && (
        <Pagination page={page} totalPages={Math.ceil(booksCount / 4)} />
      )}
    </div>
  );
}