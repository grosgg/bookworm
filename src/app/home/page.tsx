import { getTranslations } from 'next-intl/server';
import BookReadCountCard from '@/app/ui/home/read-count-card';
import BookAllCountCard from '@/app/ui/home/all-count-card';

export default async function Page() {
  const t = await getTranslations('pages.home');
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">{t('title')}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <BookReadCountCard />
        <BookAllCountCard />
      </div>
    </div>
  );
}