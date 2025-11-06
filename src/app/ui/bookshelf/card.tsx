import Link from "next/link";
import { getBooksCountForBookshelf } from "@/app/lib/data";
import { BookshelfType } from "@/app/lib/definitions";
import { getTranslations } from 'next-intl/server';
import VisibilityPill from "@/app/ui/books/visibility-pill";

export default async function BookshelfCard({ bookshelf }: { bookshelf: BookshelfType }) {
  const t = await getTranslations('ui.bookshelfCard');
  const booksCount = await getBooksCountForBookshelf(bookshelf.id);

  return (
    <div
      key={bookshelf.id}
      className="rounded-lg shadow-md bg-white p-6 border border-gray-200 hover:shadow-lg transition-shadow"
    >
      <Link href={`/bookshelves/${bookshelf.id}`}>
        <h2 className="text-2xl font-bold mb-2">{bookshelf.name}</h2>
      </Link>
      <VisibilityPill visibility={bookshelf.visibility} />
      <p className="text-md font-medium">{t('bookCount', { count: booksCount })}</p>
      <div className="flex items-center gap-2">
        <Link href={`/bookshelves/${bookshelf.id}/edit`} className="text-sm text-yellow-500 hover:text-yellow-600 cursor-pointer">{t('edit')}</Link>
      </div>
    </div>
  );
}