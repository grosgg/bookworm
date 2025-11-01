import Link from "next/link";
import { getBooksByBookshelfId } from "@/app/lib/data";
import { BookshelfType } from "@/app/lib/definitions";

export default async function BookshelfCard({ bookshelf }: { bookshelf: BookshelfType }) {
  const books = await getBooksByBookshelfId(bookshelf.id);

  return (
    <div
      key={bookshelf.id}
      className="rounded-lg shadow-md bg-white p-6 border border-gray-200 hover:shadow-lg transition-shadow"
    >
      <Link href={`/bookshelves/${bookshelf.id}`}>
        <h2 className="text-2xl font-bold mb-2">{bookshelf.name}</h2>
      </Link>
      <p className="text-sm text-gray-500">{bookshelf.visibility}</p>
      <p className="text-md font-medium">{books.length} book(s)</p>
      <div className="flex items-center gap-2">
        <Link href={`/bookshelves/${bookshelf.id}/edit`} className="text-sm text-yellow-500">Edit</Link>
        {/* <Link href={`/bookshelves/${bookshelf.id}/delete`} className="text-sm text-red-500">Delete</Link> */}
      </div>
    </div>
  );
}