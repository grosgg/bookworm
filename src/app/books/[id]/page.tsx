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

export default async function BookPage(props: { params: Promise<{ id: string }> }) {
  const t = await getTranslations('pages.bookDetail');
  const params = await props.params;
  const book: BookType | undefined = await getBookById(params.id);
  if (!book) { redirect('/books'); }

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">{book.title}</h1>
        <div className="flex items-center gap-2">
          <Link
            href={`/books/${book.id}/edit`}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-200 rounded-md hover:bg-yellow-100 transition"
          ><PencilSquareIcon className="w-4 h-4" /></Link>
          <DeleteButton book={book} />
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-10">
          <div className="flex items-start gap-20 lg:w-2/3">
            <div className="flex flex-col">
              <p className="text-lg font-medium">{book.author}</p>
              <p className="text-sm text-gray-500">{book.year}</p>
              <p className="text-sm text-gray-500">{book.publisher}</p>
              {!!book.pages && (
                <p className="text-sm text-gray-500">{book.pages} {t('pages')}</p>
              )}
              {book.isbn && (
                <p className="text-sm text-gray-500">{t('isbn')} {book.isbn}</p>
              )}
              <div className="flex items-center gap-2 my-2">
                <LanguagePill language={book.language} />
                <MediaPill media={book.media} />
                <StatusPill status={book.status} />
              </div>
            </div>
            <div>
              {book.coverUrl && (
                <img
                  src={book.coverUrl}
                  alt={book.title}
                  className="w-24 h-36 object-cover rounded ml-4 shadow"
                />
              )}
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
      </div>
    </>
  );
}