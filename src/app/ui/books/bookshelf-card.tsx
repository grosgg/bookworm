import Link from "next/link";
import { getBooksByBookshelfId } from "@/app/lib/data";
import { BookshelfType } from "@/app/lib/definitions";

export default async function BookshelfCard({ bookshelf }: { bookshelf: BookshelfType }) {
  const books = await getBooksByBookshelfId(bookshelf.id);

  return (
    <Link
      key={bookshelf.id}
      href={`/bookshelves/${bookshelf.id}`}
      className="rounded-lg shadow-md bg-white p-6 border border-gray-200 hover:shadow-lg transition-shadow"
    >
      <h2 className="text-2xl font-bold mb-2">{bookshelf.name}</h2>
      <p className="text-sm text-gray-500">{bookshelf.visibility}</p>
      <p className="text-md font-medium">{books.length} books</p>
    </Link>
  );
}