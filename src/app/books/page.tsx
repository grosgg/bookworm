import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";
import { getBooksByUserId } from "@/app/lib/data";
import { BookType } from "@/app/lib/definitions";
import BookCard from "@/app/ui/books/book-card";

export default async function BooksPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) { throw new Error('Unauthorized'); }

  const userId = session.user.id;
  const books = await getBooksByUserId(userId);
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Books</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {books.map((book: BookType) => <BookCard key={book.id} book={book} onSearch={false} />)}
      </div>
    </div>
  );
}