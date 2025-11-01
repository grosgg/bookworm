import { getBooksByBookshelfId, getBookshelfById } from "@/app/lib/data";
import { BookshelfType, BookType } from "@/app/lib/definitions";
import BookCard from "@/app/ui/books/book-card";

export default async function BookshelfPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const [bookshelf, books]: [BookshelfType, BookType[]] = await Promise.all([
    getBookshelfById(params.id),
    getBooksByBookshelfId(params.id)
  ]);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-3xl font-bold">{bookshelf.name}</h1>
        <p className="text-sm text-gray-500">{bookshelf.visibility}</p>
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