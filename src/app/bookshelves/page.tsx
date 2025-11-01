// import Bookshelf from '@/app/ui/books/bookshelf';
import { BookshelfType } from '@/app/lib/definitions';
import { getBookshelvesByUserId } from '@/app/lib/data';
import { auth } from '@/app/lib/auth';
import { headers } from 'next/headers';
import { FolderPlusIcon } from '@heroicons/react/24/outline';
import BookshelfCard from '@/app/ui/bookshelf/bookshelf-card';
import Link from 'next/link';
import DefaultBookshelfCard from '@/app/ui/bookshelf/default-bookshelf-card';

export default async function BookshelvesPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) { throw new Error('Unauthorized'); }

  const userId = session.user.id;
  const bookshelves: BookshelfType[] = await getBookshelvesByUserId(userId);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold">Bookshelves</h1>
        <Link
          href="/bookshelves/create"
          className="flex items-center gap-2 px-4 py-2 bg-yellow-200 rounded-md hover:bg-yellow-100 transition"
        >
          New Bookshelf <FolderPlusIcon className="w-6" />
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