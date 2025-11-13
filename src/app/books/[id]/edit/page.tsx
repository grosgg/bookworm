import { getBookById } from "@/app/lib/data/books";
import { getAllBookshelvesByUserId } from "@/app/lib/data/bookshelves";
import { ActionStateType, BookshelfType, BookType } from "@/app/lib/definitions";
import { getTranslations } from "next-intl/server";
import { editBookAction } from "@/app/lib/actions/books";
import BookForm from "@/app/ui/books/edit-form";
import LanguagePill from "@/app/ui/books/language-pill";

export default async function EditBookPage(props: { params: Promise<{ id: string }> }) {
  const t = await getTranslations('pages.editBook');
  const tBook = await getTranslations('pages.bookDetail');
  const params = await props.params;
  const book: BookType = await getBookById(params.id);
  const bookshelves: BookshelfType[] = await getAllBookshelvesByUserId(book.userId);
  const editBookActionWithId: (_previousState: ActionStateType, formData: FormData) => Promise<ActionStateType> = editBookAction.bind(null, params.id);

  return (
    <div>
      <h1 className="text-3xl font-bold">{t('title', { title: book.title })}</h1>
      <p className="text-lg font-medium">{book.author}</p>
      <p className="text-sm text-gray-500">{book.year}</p>
      <p className="text-sm text-gray-500">{book.publisher}</p>
      {!!book.pages && (
        <p className="text-sm text-gray-500">{book.pages} {tBook('pages')}</p>
      )}
      {book.isbn && (
        <p className="text-sm text-gray-500">{tBook('isbn')} {book.isbn}</p>
      )}
      <div className="flex items-center gap-2 my-2">
        <LanguagePill language={book.language} />
      </div>
      <BookForm action={editBookActionWithId} book={book} bookshelves={bookshelves} />
    </div>
  );
}