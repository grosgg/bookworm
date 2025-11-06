import { BookType } from "@/app/lib/definitions";
import Link from "next/link";
import { getTranslations } from 'next-intl/server';
import MediaPill from "./media-pill";
import StatusPill from "./status-pill";
import LanguagePill from "./language-pill";
import DeleteButton from "@/app/ui/books/delete-button";
import DeleteLink from "./delete-link";

export default async function BookCard({ book }: { book: BookType }) {
  const t = await getTranslations('pages.bookDetail');
  return (
    <div className="rounded-lg shadow-md bg-white p-6 border border-gray-200 hover:shadow-lg transition-shadow flex items-start">
      <div className="flex-1 pr-4">
        <Link href={`/books/${book.id}`}>
          <h2 className="text-xl font-bold mb-2">{book.title}</h2>
        </Link>
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
        <div className="flex items-center gap-2">
          <Link href={`/books/${book.id}/edit`} className="text-sm text-yellow-500 hover:text-yellow-600 cursor-pointer">{t('edit')}</Link>
          <DeleteLink book={book} />
        </div>
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