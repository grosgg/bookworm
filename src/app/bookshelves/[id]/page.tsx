import { getBooksByBookshelfId, getBookshelfById } from "@/app/lib/data";
import { BookshelfType, BookType } from "@/app/lib/definitions";
import BookCard from "@/app/ui/books/book-card";
import VisibilityPill from "@/app/ui/books/visibility-pill";
import { getTranslations } from 'next-intl/server';

export default async function BookshelfPage(props: { params: Promise<{ id: string }> }) {
  const t = await getTranslations('pages.bookshelves');
  const params = await props.params;
  const [bookshelf, books]: [BookshelfType, BookType[]] = await Promise.all([
    getBookshelfById(params.id),
    getBooksByBookshelfId(params.id)
  ]);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-3xl font-bold">{bookshelf.name}</h1>
        <VisibilityPill visibility={bookshelf.visibility} />
        <p className="text-md font-medium">{t('bookCount', { count: books.length })}</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {books.map((book) => (
          <BookCard key={book.id} book={book} onSearch={false} />
        ))}
      </div>
    </div>
  );
}