import { getBooksCountForCurrentUser, getBooksForCurrentUser } from "@/app/lib/data";
import { BookType } from "@/app/lib/definitions";
import BookCard from "@/app/ui/books/list-card";
import { getTranslations } from 'next-intl/server';
import BookSearchListForm from "../ui/books/search-list-form";
import Pagination from "../ui/books/pagination";

export default async function BooksPage(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const t = await getTranslations('pages.books');
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const page = Number(searchParams?.page) || 1;
  const books = await getBooksForCurrentUser(query, page);
  const totalBooks = await getBooksCountForCurrentUser(query);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">{t('title')}</h1>
      <BookSearchListForm />
      {totalBooks > 0 && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {books.map((book: BookType) => <BookCard key={book.id} book={book} />)}
          </div>
          <Pagination page={page} totalPages={Math.ceil(totalBooks / 4)} />
        </>
      )}
      {totalBooks == 0 && (
        <div className="text-gray-500">{t('noBooksFound')}</div>
      )}
    </div>
  );
}