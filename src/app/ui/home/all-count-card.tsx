import { getTranslations } from "next-intl/server";
import { getBooksCountForCurrentUser } from "@/app/lib/data/books";

export default async function AllCountCard() {
  const t = await getTranslations('ui.allCountCard');
  const allCount = await getBooksCountForCurrentUser('');
  return (
    <div className="rounded-lg shadow-md bg-white p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <h2 className="text-4xl font-bold mb-2">{allCount}</h2>
      <p className="text-lg font-medium">{t('allCountDescription')}</p>
    </div>
  );
}