import { BookType } from "@/app/lib/definitions";
import { addBookToCollectionAction } from "@/app/lib/actions";

export default function AddToCollectionButton({ book }: { book: BookType }) {
  return (
    <form action={addBookToCollectionAction}>
      <input type="hidden" name="title" value={book.title} />
      <input type="hidden" name="author" value={book.author} />
      <input type="hidden" name="isbn" value={book.isbn} />
      <input type="hidden" name="coverUrl" value={book.coverUrl} />
      <input type="hidden" name="pages" value={book.pages} />
      <input type="hidden" name="year" value={book.year} />
      <input type="hidden" name="publisher" value={book.publisher} />
      <input type="hidden" name="language" value={book.language} />

      <button type="submit" className="mt-2 bg-yellow-200 hover:bg-yellow-100 text-black rounded px-4 py-2 font-medium">
        Add to collection
      </button>
    </form>
  );
}