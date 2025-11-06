import { getBookById } from "@/app/lib/data";
import { BookType } from "@/app/lib/definitions";
import LanguagePill from "@/app/ui/books/language-pill";
import MediaPill from "@/app/ui/books/media-pill";
import StatusPill from "@/app/ui/books/status-pill";
import { getTranslations } from 'next-intl/server';
import Link from "next/link";
import { redirect } from "next/navigation";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import DeleteButton from "@/app/ui/books/delete-button";
import BackLink from "@/app/ui/books/back-link";

export default async function BookPage(props: { params: Promise<{ id: string }> }) {
  const t = await getTranslations('pages.bookDetail');
  const params = await props.params;
  const book: BookType | undefined = await getBookById(params.id);

  if (!book) { redirect('/books'); }

  return (
    <>
      <div className="flex flex-row items-start justify-between gap-2">
        <div>
          <h1 className="text-3xl font-bold">{book.title}</h1>
          <p className="text-lg font-medium">{book.author}</p>
        </div>
        <div className="flex flex-col md:flex-row gap-2">
          <BackLink bookshelfId={book.bookshelfId} />
          <Link
            href={`/books/${book.id}/edit`}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-200 rounded-md hover:bg-yellow-100 transition"
          ><PencilSquareIcon className="w-4 h-4" /></Link>
          <DeleteButton book={book} />
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col md:flex-row md:w-full">
            <div className="flex-1 pr-4">
              <p className="text-sm text-gray-500">{book.year}</p>
              <p className="text-sm text-gray-500">{book.publisher}</p>
              {!!book.pages && (
                <p className="text-sm text-gray-500">{book.pages} {t('pages')}</p>
              )}
              {book.isbn && (
                <p className="text-sm text-gray-500">{t('isbn')} {book.isbn}</p>
              )}
            </div>
            {book.coverUrl && (
              <img
                src={book.coverUrl}
                alt={book.title}
                className="w-32 h-48 object-cover rounded my-2 shadow md:hidden"
              />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2 my-2">
              <LanguagePill language={book.language} />
              <MediaPill media={book.media} />
              <StatusPill status={book.status} />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold">{t('personalNotes')}</h2>
            {!book.notes && (
              <p className="text-sm text-gray-500">{t('noNotesYet')}</p>
            )}
            {book.notes && (
              <p className="text-sm">{book.notes}</p>
            )}
          </div>
        </div>
        {book.coverUrl && (
          <img
            src={book.coverUrl}
            alt={book.title}
            className="w-32 h-48 object-cover rounded my-2 shadow hidden md:block"
          />
        )}
      </div>
    </>
  );
}