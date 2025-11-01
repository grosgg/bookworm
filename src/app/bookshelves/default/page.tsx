import { getBooksFromDefaultBookshelf } from "@/app/lib/data";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { BookType } from "@/app/lib/definitions";

export default async function DefaultBookshelfPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) { throw new Error('Unauthorized'); }

  const userId = session.user.id;
  const books: BookType[] = await getBooksFromDefaultBookshelf(userId);

  return (
    <div>
      <h1 className="text-3xl font-bold">Default Bookshelf</h1>
      <p className="text-sm text-gray-500">private</p>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {books.map((book) => (
          <div key={book.id} className="rounded-lg shadow-md bg-white p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
            <p className="text-sm text-gray-500">{book.author}</p>
            <p className="text-sm text-gray-500">{book.isbn}</p>
          </div>
        ))}
      </div>
    </div>
  );
}