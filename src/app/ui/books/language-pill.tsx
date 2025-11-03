import { getTranslations } from 'next-intl/server';

export default async function LanguagePill({ language }: { language: string | undefined }) {
  if (!language) return null;
  const t = await getTranslations('ui.languagePill');
  const languageLabels = {
    en: t('english'),
    fr: t('french'),
    ja: t('japanese'),
  };
  const languageColors = {
    en: 'bg-gray-400 text-white',
    fr: 'bg-gray-400 text-white',
    ja: 'bg-gray-400 text-white',
  };
  const languageLabel = languageLabels[language as keyof typeof languageLabels] || language;
  const languageColor = languageColors[language as keyof typeof languageColors] || 'bg-gray-400 text-white';
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-medium ${languageColor}`}>
      {languageLabel}
    </span>
  );
}