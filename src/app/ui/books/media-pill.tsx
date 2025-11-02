import { getTranslations } from 'next-intl/server';

export default async function MediaPill({ media }: { media: 'physical' | 'digital' }) {
  const t = await getTranslations('ui.mediaPill');
  const mediaLabels = {
    physical: t('physical'),
    digital: t('digital'),
  };
  const mediaColors = {
    physical: 'bg-gray-500 text-white',
    digital: 'bg-gray-500 text-white',
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-medium ${mediaColors[media]}`}>
      {mediaLabels[media]}
    </span>
  );
}