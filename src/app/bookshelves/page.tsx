// import Bookshelf from '@/app/ui/books/bookshelf';
import { BookshelfType } from '@/app/lib/definitions';
import { getBookshelvesByUserId } from '@/app/lib/data';
import { auth } from '@/app/lib/auth';
import { headers } from 'next/headers';

export default async function BookshelvesPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) { throw new Error('Unauthorized'); }

  const userId = session.user.id;
  const bookshelves: BookshelfType[] = await getBookshelvesByUserId(userId);
  // const bookshelves: BookshelfType[] = [];
  return (
    <div>
      <h1 className="text-3xl font-bold">Bookshelves</h1>
      <div className="flex flex-col gap-4">
        {bookshelves.map((bookshelf) => (
          <div key={bookshelf.id}>
            <h2 className="text-2xl font-bold">{bookshelf.name}</h2>
          </div>
        ))}
      </div>

    </div>
  );
}