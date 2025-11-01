import { getBookById } from "@/app/lib/data";
import { BookType } from "@/app/lib/definitions";
import StatusPill from "@/app/ui/books/status-pill";

export default async function BookPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const book: BookType = await getBookById(params.id);
  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-start gap-20">
        <div className="flex-1 md:flex-none">
          <h1 className="text-3xl font-bold">{book.title}</h1>
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
          <StatusPill status={book.status} />
        </div>
        <div>
          {book.coverUrl && (
            <img
              src={book.coverUrl}
              alt={`Cover of ${book.title}`}
              className="w-24 h-36 object-cover rounded ml-4 shadow"
            />
          )}
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold">Personal Notes</h2>
        {!book.notes && (
          <p className="text-sm text-gray-500">No notes yet</p>
        )}
        {book.notes && (
          <p className="text-sm">{book.notes}</p>
        )}
      </div>
    </div>
  );
}