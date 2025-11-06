import { searchBooks } from "@/app/lib/data";
import { BookType } from "@/app/lib/definitions";
import BookCard from "@/app/ui/books/search-card";
import { getTranslations } from 'next-intl/server';
import Pagination from "./pagination";

export default async function BookSearchResults({ searchType, query, lang, page }: {
  searchType: 'intitle' | 'isbn';
  query: string;
  lang: 'en' | 'fr' | 'ja';
  page: number;
}) {
  const t = await getTranslations('ui.searchResults');
  const { books, totalCount } = await searchBooks(searchType, query, lang, page);

  if (totalCount === 0) {
    return <div className="text-gray-500">{t('noBooksFound')}</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {books.map((book: BookType) => (
          <BookCard key={book.isbn ?? [book.title, book.author, book.publisher, book.year].join('-')} book={book} />
        ))}
      </div>
      <Pagination page={page} totalPages={Math.ceil(totalCount / 4)} />
    </div>
  );
}