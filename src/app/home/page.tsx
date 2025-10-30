// import Bookshelf from '@/app/ui/books/bookshelf';
import { BookshelfType } from '@/app/lib/definitions';
// import { getBookshelvesByUserId } from '@/app/lib/data';
import { requireAuth } from '@/app/lib/auth';


export default async function Page() {
  const session = await requireAuth();
  console.log(session);

  // const bookshelves = await getBookshelvesByUserId(userId);
  const bookshelves: BookshelfType[] = [];

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