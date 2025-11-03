import { BookType } from "@/app/lib/definitions";
import AddToCollectionButton from "./add-to-collection-button";
import Link from "next/link";
import { getTranslations } from 'next-intl/server';
import MediaPill from "./media-pill";
import StatusPill from "./status-pill";
import LanguagePill from "./language-pill";

export default async function BookCard({ book, onSearch }: { book: BookType, onSearch: boolean }) {
  const t = await getTranslations('pages.bookDetail');
  return (
    <div className="rounded-lg shadow-md bg-white p-6 border border-gray-200 hover:shadow-lg transition-shadow flex items-start">
      <div className="flex-1 pr-4">
        {!onSearch && (
          <Link href={`/books/${book.id}`}>
            <h2 className="text-xl font-bold mb-2">{book.title}</h2>
          </Link>
        )}
        {onSearch && (
          <h2 className="text-xl font-bold mb-2">{book.title}</h2>
        )}
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
          {!onSearch && (
            <>
              <MediaPill media={book.media} />
              <StatusPill status={book.status} />
            </>
          )}
        </div>
        {onSearch && (
          <AddToCollectionButton book={book} />
        )}
      </div>
      {book.coverUrl && (
        <img
          src={book.coverUrl}
          alt={book.title}
          className="w-24 h-36 object-cover rounded ml-4 shadow"
        />
      )}
    </div>
  );
}