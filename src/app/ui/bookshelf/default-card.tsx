import Link from "next/link";
import { getAllBooksFromDefaultBookshelf } from "@/app/lib/data";
import { getTranslations } from 'next-intl/server';
import VisibilityPill from "../books/visibility-pill";

export default async function DefaultBookshelfCard() {
  const t = await getTranslations('pages.defaultBookshelf');
  const books = await getAllBooksFromDefaultBookshelf();

  return (
    <div
      key="default-bookshelf"
      className="rounded-lg shadow-md bg-white p-6 border border-gray-200 hover:shadow-lg transition-shadow"
    >
      <Link href="/bookshelves/default">
        <h2 className="text-2xl font-bold mb-2">{t('title')}</h2>
      </Link>
      <VisibilityPill visibility="private" />
      <p className="text-md font-medium">{t('bookCount', { count: books.length })}</p>
    </div>
  );
}