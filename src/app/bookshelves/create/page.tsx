import { createBookshelfAction } from '@/app/lib/actions/bookshelves';
import { getTranslations } from 'next-intl/server';
import BookshelfForm from '@/app/ui/bookshelf/form';

export default async function CreateBookshelfPage() {
  const t = await getTranslations('pages.createBookshelf');
  return (
    <div>
      <h1 className="text-3xl font-bold">{t('title')}</h1>
      <BookshelfForm action={createBookshelfAction} bookshelf={null} />
    </div>
  );
}