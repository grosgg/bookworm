import { getTranslations } from 'next-intl/server';

export default async function Page() {
  const t = await getTranslations('pages.home');
  return (
    <div>
      <h1 className="text-3xl font-bold">{t('title')}</h1>
    </div>
  );
}