import { getTranslations } from 'next-intl/server';

export default async function VisibilityPill({ visibility }: { visibility: 'private' | 'public' }) {
  const t = await getTranslations('ui.visibilityPill');
  const visibilityLabels = {
    private: t('private'),
    public: t('public'),
  };
  const visibilityColors = {
    private: 'bg-gray-400 text-white',
    public: 'bg-yellow-100',
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-medium ${visibilityColors[visibility]}`}>
      {visibilityLabels[visibility]}
    </span>
  );
}