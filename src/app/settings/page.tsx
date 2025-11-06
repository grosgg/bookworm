import LocaleLinks from "@/app/ui/layout/locale-links";
import { useTranslations } from "next-intl";

export default function SettingsPage() {
  const t = useTranslations('pages.settings');
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">{t('title')}</h1>
      <h2 className="text-2xl font-bold">{t('language')}</h2>
      <div className="flex gap-2">
        <LocaleLinks />
      </div>
    </div>
  );
}