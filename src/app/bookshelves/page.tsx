import { BookshelfType } from '@/app/lib/definitions';
import { getBookshelvesByUserId } from '@/app/lib/data';
import { requireSession } from '@/app/lib/auth';
import { FolderPlusIcon } from '@heroicons/react/24/outline';
import BookshelfCard from '@/app/ui/bookshelf/card';
import Link from 'next/link';
import DefaultBookshelfCard from '@/app/ui/bookshelf/default-card';
import { getTranslations } from 'next-intl/server';

export default async function BookshelvesPage() {
  const t = await getTranslations('pages.bookshelves');
  const session = await requireSession();

  const userId = session.user.id;
  const bookshelves: BookshelfType[] = await getBookshelvesByUserId(userId);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">{t('title')}</h1>
        <Link
          href="/bookshelves/create"
          className="flex items-center gap-2 px-4 py-2 bg-yellow-200 rounded-md hover:bg-yellow-100 transition"
        >
          {t('newBookshelf')} <FolderPlusIcon className="w-6" />
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {bookshelves.map((bookshelf) => (
          <BookshelfCard key={bookshelf.id} bookshelf={bookshelf} />
        ))}
        <DefaultBookshelfCard userId={userId} />
      </div>

    </div>
  );
}