import { getBookshelfById } from "@/app/lib/data";
import { BookshelfType } from "@/app/lib/definitions";
import { editBookshelfAction } from "@/app/lib/actions";
import Link from "next/link";
import { getTranslations } from 'next-intl/server';

export default async function EditBookshelfPage(props: { params: Promise<{ id: string }> }) {
  const t = await getTranslations('pages.editBookshelf');
  const params = await props.params;
  const bookshelf: BookshelfType = await getBookshelfById(params.id);
  const editBookshelfActionWithId = editBookshelfAction.bind(null, params.id);

  return (
    <div>
      <h1 className="text-3xl font-bold">{t('title', { name: bookshelf.name })}</h1>
      <form action={editBookshelfActionWithId} className="mt-6 flex flex-col gap-6 max-w-md">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="font-medium text-lg">
            {t('name')}
          </label>
          <input id="name" name="name" type="text" defaultValue={bookshelf.name} placeholder={t('bookshelfNamePlaceholder')} required className="rounded border px-4 py-2" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="visibility" className="font-medium text-lg">
            {t('visibility')}
          </label>
          <select id="visibility" name="visibility" defaultValue={bookshelf.visibility} required className="rounded border px-4 py-2">
            <option value="public">{t('public')}</option>
            <option value="private">{t('private')}</option>
          </select>
        </div>
        <div className="flex gap-4 items-center">
          <button
            type="submit"
            className="flex items-center gap-5 rounded-lg bg-yellow-200 px-6 py-3 text-sm font-medium transition-colors hover:bg-yellow-100 md:text-base"
          >
            {t('save')}
          </button>
          <Link href="/bookshelves" className="text-sm text-gray-500">{t('cancel')}</Link>
        </div>
      </form>
    </div>
  );
}