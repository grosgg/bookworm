import { getBookById } from "@/app/lib/data";
import { BookType } from "@/app/lib/definitions";
import MediaPill from "@/app/ui/books/media-pill";
import StatusPill from "@/app/ui/books/status-pill";
import { getTranslations } from 'next-intl/server';

export default async function BookPage(props: { params: Promise<{ id: string }> }) {
  const t = await getTranslations('pages.bookDetail');
  const params = await props.params;
  const book: BookType = await getBookById(params.id);
  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-start gap-20 lg:w-2/3">
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{book.title}</h1>
          <p className="text-lg font-medium">{book.author}</p>
          <p className="text-sm text-gray-500">{book.year}</p>
          <p className="text-sm text-gray-500">{book.publisher}</p>
          {!!book.pages && (
            <p className="text-sm text-gray-500">{book.pages} {t('pages')}</p>
          )}
          {book.isbn && (
            <p className="text-sm text-gray-500">{t('isbn')} {book.isbn}</p>
          )}
          <p className="text-sm text-gray-500">{book.language}</p>
          <div className="flex items-center gap-2">
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
  );
}