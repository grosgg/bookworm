import { BookshelfType } from '@/app/lib/definitions';
import { getBookshelvesByUserId, getBookshelvesCountForCurrentUser } from '@/app/lib/data/bookshelves';
import { requireSession } from '@/app/lib/auth';
import { FolderPlusIcon } from '@heroicons/react/24/outline';
import BookshelfCard from '@/app/ui/bookshelf/card';
import Link from 'next/link';
import DefaultBookshelfCard from '@/app/ui/bookshelf/default-card';
import { getTranslations } from 'next-intl/server';
import Pagination from '../ui/books/pagination';

export default async function BookshelvesPage(props: {
  searchParams?: Promise<{
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const t = await getTranslations('pages.bookshelves');
  const session = await requireSession();
  const page = Number(searchParams?.page) || 1;
  const userId = session.user.id;
  const [bookshelves, totalBookshelves]: [BookshelfType[], number] = await Promise.all([
    getBookshelvesByUserId(userId, page),
    getBookshelvesCountForCurrentUser(userId)
  ]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">{t('title')}</h1>
        <Link
          href="/bookshelves/create"
          className="flex items-center gap-2 px-4 py-2 bg-yellow-200 rounded-md hover:bg-yellow-100 transition"
        >
          <FolderPlusIcon className="w-6" />
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {bookshelves.map((bookshelf) => (
          <BookshelfCard key={bookshelf.id} bookshelf={bookshelf} />
        ))}
        <DefaultBookshelfCard />
      </div>
      <Pagination page={page} totalPages={Math.ceil(totalBookshelves / 5)} />
    </div>
  );
}