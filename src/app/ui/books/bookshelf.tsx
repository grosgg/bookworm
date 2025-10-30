import Image from 'next/image';
import { fetchBooks } from '@/app/lib/data';

export default async function Bookshelf() {
  const books = await fetchBooks();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4">
      {books.map((book) => (
        <div key={book.id} className="flex flex-col gap-2 bg-white p-4 rounded-lg border border-gray-200 shadow-md">
          <h2 className="text-lg font-bold">{book.title}</h2>
          <p className="text-sm text-gray-500">{book.author}</p>
          <p className="text-sm text-gray-500">{book.isbn}</p>
          <p className="text-sm text-gray-500">{book.status}</p>
          <Image src={book.cover_url} alt={book.title} width={100} height={100} unoptimized />
          <p className="text-sm text-gray-500">{book.notes}</p>
        </div>
      ))}
    </div>
  );
}