import Link from "next/link";
import { getBooksFromDefaultBookshelf } from "@/app/lib/data";

export default async function DefaultBookshelfCard({ userId }: { userId: string }) {
  const books = await getBooksFromDefaultBookshelf(userId);

  return (
    <div
      key="default-bookshelf"
      className="rounded-lg shadow-md bg-white p-6 border border-gray-200 hover:shadow-lg transition-shadow"
    >
      <Link href="/bookshelves/default">
        <h2 className="text-2xl font-bold mb-2">Default</h2>
      </Link>
      <p className="text-sm text-gray-500">private</p>
      <p className="text-md font-medium">{books.length} book(s)</p>
    </div>
  );
}