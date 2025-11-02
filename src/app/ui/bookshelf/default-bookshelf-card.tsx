import Link from "next/link";
import { getBooksFromDefaultBookshelf } from "@/app/lib/data";
import { getTranslations } from 'next-intl/server';

export default async function DefaultBookshelfCard({ userId }: { userId: string }) {
  const t = await getTranslations('pages.defaultBookshelf');
  const books = await getBooksFromDefaultBookshelf(userId);

  return (
    <div
      key="default-bookshelf"
      className="rounded-lg shadow-md bg-white p-6 border border-gray-200 hover:shadow-lg transition-shadow"
    >
      <Link href="/bookshelves/default">
        <h2 className="text-2xl font-bold mb-2">{t('title')}</h2>
      </Link>
      <p className="text-sm text-gray-500">{t('private')}</p>
      <p className="text-md font-medium">{t('bookCount', { count: books.length })}</p>
    </div>
  );
}