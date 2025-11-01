import { BookType } from "@/app/lib/definitions";

export default function BookCard({ book }: { book: BookType }) {
  return (
    <div className="rounded-lg shadow-md bg-white p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <h2 className="text-2xl font-bold mb-2">{book.title}</h2>
      <p className="text-sm text-gray-500">{book.author}</p>
      <p className="text-sm text-gray-500">{book.isbn}</p>
    </div>
  );
}