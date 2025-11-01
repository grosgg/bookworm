import { getBooksFromDefaultBookshelf } from "@/app/lib/data";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { BookType } from "@/app/lib/definitions";
import BookCard from "@/app/ui/books/book-card";

export default async function DefaultBookshelfPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) { throw new Error('Unauthorized'); }

  const userId = session.user.id;
  const books: BookType[] = await getBooksFromDefaultBookshelf(userId);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-3xl font-bold">Default Bookshelf</h1>
        <p className="text-sm text-gray-500">private</p>
        <p className="text-md font-medium">{books.length} book(s)</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {books.map((book) => (
          <BookCard key={book.id} book={book} onSearch={false} />
        ))}
      </div>
    </div>
  );
}