import { getTranslations } from "next-intl/server";
import { getReadBooksCountForCurrentUser } from "@/app/lib/data/books";

export default async function ReadCountCard() {
  const t = await getTranslations('ui.readCountCard');
  const readCount = await getReadBooksCountForCurrentUser();
  return (
    <div className="rounded-lg shadow-md bg-white p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <h2 className="text-4xl font-bold mb-2">{readCount}</h2>
      <p className="text-lg font-medium">{t('readCountDescription')}</p>
    </div>
  );
}