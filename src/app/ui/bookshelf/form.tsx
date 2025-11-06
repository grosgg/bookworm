'use client';

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ActionStateType, BookshelfType } from "@/app/lib/definitions";
import { handleActionResponse } from "@/app/lib/actionResponseHandler";

export default function BookshelfForm({ action, bookshelf }: { action: (_previousState: ActionStateType, formData: FormData) => Promise<ActionStateType>, bookshelf: BookshelfType | null }) {
  const t = useTranslations('ui.bookshelfForm');
  const [formState, formAction] = useActionState(action, { success: false, message: '', toast: false, redirect: '' });

  useEffect(() => {
    handleActionResponse(formState);
  }, [formState])

  return (
    <form action={formAction} className="mt-6 flex flex-col gap-6 max-w-md" key={bookshelf?.updatedAt}>
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="font-medium text-lg">
          {t('name')}
        </label>
        <input id="name" name="name" type="text" defaultValue={bookshelf?.name} placeholder={t('bookshelfNamePlaceholder')} required className="rounded border px-4 py-2" />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="visibility" className="font-medium text-lg">
          {t('visibility')}
        </label>
        <select id="visibility" name="visibility" defaultValue={bookshelf?.visibility} required className="rounded border px-4 py-2">
          <option value="private">{t('private')}</option>
          <option value="public">{t('public')}</option>
        </select>
      </div>
      <div className="flex gap-4 items-center">
        <button type="submit" className="flex items-center gap-5 rounded-lg bg-yellow-200 px-6 py-3 text-sm font-medium transition-colors hover:bg-yellow-100 md:text-base">
          {t('save')}
        </button>
        <Link href={`/bookshelves/${bookshelf?.id}`} className="text-sm text-gray-500 hover:text-gray-600 cursor-pointer">{t('cancel')}</Link>
      </div>
    </form>
  );
}