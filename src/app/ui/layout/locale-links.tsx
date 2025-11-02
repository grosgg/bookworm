'use client';
import { setLocaleAction } from "@/app/lib/actions";
import { useTranslations } from 'next-intl';

export default function LocaleLinks() {
  const t = useTranslations('ui.localeLinks');
  return (
    <>
      <a
        className="text-sm text-yellow-400 hover:underline cursor-pointer"
        onClick={async () => {
          await setLocaleAction('en');
          window.location.reload();
        }}
      >
        {t('english')}
      </a>
      <span className="text-sm text-gray-400">|</span>
      <a
        className="text-sm text-yellow-400 hover:underline cursor-pointer"
        onClick={async () => {
          await setLocaleAction('fr');
          window.location.reload();
        }}
      >
        {t('francais')}
      </a>

    </>
  );
}