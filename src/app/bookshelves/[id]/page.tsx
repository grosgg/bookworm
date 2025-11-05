import { getBooksByBookshelfId, getBookshelfById } from "@/app/lib/data";
import { BookshelfType, BookType } from "@/app/lib/definitions";
import DeleteButton from "@/app/ui/bookshelf/delete-button";
import BookCard from "@/app/ui/books/list-card";
import VisibilityPill from "@/app/ui/books/visibility-pill";
import { getTranslations } from 'next-intl/server';
import Link from "next/link";
import { redirect } from "next/navigation";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

export default async function BookshelfPage(props: { params: Promise<{ id: string }> }) {
  const t = await getTranslations('pages.bookshelves');
  const params = await props.params;
  const [bookshelf, books]: [BookshelfType, BookType[]] = await Promise.all([
    getBookshelfById(params.id),
    getBooksByBookshelfId(params.id)
  ]);

  if (!bookshelf) { redirect('/bookshelves'); }

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">{bookshelf.name}</h1>
        <div className="flex items-center gap-2">
          <Link
            href={`/bookshelves/${bookshelf.id}/edit`}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-200 rounded-md hover:bg-yellow-100 transition"
          ><PencilSquareIcon className="w-4 h-4" /></Link>
          <DeleteButton bookshelf={bookshelf} />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <VisibilityPill visibility={bookshelf.visibility} />
          <p className="text-md font-medium">{t('bookCount', { count: books.length })}</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </>
  );
}