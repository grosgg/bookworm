import { BookType } from "@/app/lib/definitions";
import AddToCollectionButton from "./add-to-collection-button";

export default function BookCard({ book, onSearch }: { book: BookType, onSearch: boolean }) {
  return (
    <div className="rounded-lg shadow-md bg-white p-6 border border-gray-200 hover:shadow-lg transition-shadow flex items-start">
      <div className="flex-1 pr-4">
        <h2 className="text-xl font-bold mb-2">{book.title}</h2>
        <p className="text-lg font-medium">{book.author}</p>
        <p className="text-sm text-gray-500">{book.year}</p>
        <p className="text-sm text-gray-500">{book.publisher}</p>
        {!!book.pages && (
          <p className="text-sm text-gray-500">{book.pages} pages</p>
        )}
        {book.isbn && (
          <p className="text-sm text-gray-500">ISBN: {book.isbn}</p>
        )}
        <p className="text-sm text-gray-500">{book.language}</p>
        {onSearch && (
          <AddToCollectionButton book={book} />
        )}
      </div>
      {book.coverUrl && (
        <img
          src={book.coverUrl}
          alt={`Cover of ${book.title}`}
          className="w-24 h-36 object-cover rounded ml-4 shadow"
        />
      )}
    </div>
  );
}