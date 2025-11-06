import { getTranslations } from 'next-intl/server';
import BookReadCountCard from '@/app/ui/home/read-count-card';
import BookAllCountCard from '@/app/ui/home/all-count-card';
import BookCard from '../ui/books/list-card';
import { getReadingBooksForCurrentUser } from '../lib/data';
import { BookType } from '../lib/definitions';

export default async function Page() {
  const t = await getTranslations('pages.home');
  const readingBooks = await getReadingBooksForCurrentUser();


  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">{t('title')}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <BookReadCountCard />
        <BookAllCountCard />
      </div>
      <h2 className="text-2xl font-bold">{t('currentBooks')}</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {readingBooks.map((book: BookType) => (
          <BookCard key={book.id} book={book} />
        ))}
        {readingBooks.length === 0 && (
          <div className="text-gray-500">{t('noCurrentBooks')}</div>
        )}
      </div>
    </div>
  );
}