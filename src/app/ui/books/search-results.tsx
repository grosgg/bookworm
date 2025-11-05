import { searchBooks } from "@/app/lib/data";
import { BookType } from "@/app/lib/definitions";
import BookCard from "@/app/ui/books/search-card";
import { getTranslations } from 'next-intl/server';

export default async function BookSearchResults({ searchType, query, lang }: {
  searchType: 'intitle' | 'isbn';
  query: string;
  lang: 'en' | 'fr' | 'ja';
}) {
  const t = await getTranslations('ui.searchResults');
  const books = await searchBooks(searchType, query, lang);

  if (books.length === 0) {
    return <div className="text-gray-500">{t('noBooksFound')}</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {books.map((book: BookType) => (
        <BookCard key={book.isbn ?? [book.title, book.author, book.publisher, book.year].join('-')} book={book} />
      ))}
    </div>
  );
}