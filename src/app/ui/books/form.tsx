'use client';

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ActionStateType, BookType, BookshelfType } from "@/app/lib/definitions";
import { handleActionResponse } from "@/app/lib/actionResponseHandler";

export default function BookForm({ action, book, bookshelves }: { action: (_previousState: ActionStateType, formData: FormData) => Promise<ActionStateType>, book: BookType | null, bookshelves: BookshelfType[] }) {
  const t = useTranslations('ui.bookForm');
  const [formState, formAction] = useActionState(action, { success: false, message: '', toast: false, redirect: '' });

  useEffect(() => {
    handleActionResponse(formState);
  }, [formState])

  return (
    <form action={formAction} className="mt-6 flex flex-col gap-6 max-w-md" key={book?.updatedAt}>
      <div className="flex flex-col gap-2">
        <label htmlFor="media" className="font-medium text-lg">
          {t('media')}
        </label>
        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              id="media-physical"
              name="media"
              value="physical"
              required
              defaultChecked={book?.media === "physical"}
              className="accent-blue-600"
            />
            {t('physical')}
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              id="media-digital"
              name="media"
              value="digital"
              required
              defaultChecked={book?.media === "digital"}
              className="accent-blue-600"
            />
            {t('digital')}
          </label>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="status" className="font-medium text-lg">
          {t('status')}
        </label>
        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              id="status-reading"
              name="status"
              value="reading"
              required
              defaultChecked={book?.status === "reading"}
              className="accent-blue-600"
            />
            {t('reading')}
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              id="status-read"
              name="status"
              value="read"
              required
              defaultChecked={book?.status === "read"}
              className="accent-blue-600"
            />
            {t('read')}
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              id="status-not-read"
              name="status"
              value="not_read"
              required
              defaultChecked={book?.status === "not_read"}
              className="accent-blue-600"
            />
            {t('not_read')}
          </label>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="notes" className="font-medium text-lg">
          {t('notes')}
        </label>
        <textarea id="notes" name="notes" defaultValue={book?.notes} placeholder={t('notesPlaceholder')} className="rounded border px-4 py-2" />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="bookshelfId" className="font-medium text-lg">
          {t('bookshelf')}
        </label>
        <select id="bookshelfId" name="bookshelfId" defaultValue={book?.bookshelfId ?? ''} className="rounded border px-4 py-2">
          <option value="">{t('selectBookshelf')}</option>
          {bookshelves.map((bookshelf) => (
            <option key={bookshelf.id} value={bookshelf.id}>{bookshelf.name}</option>
          ))}
        </select>
      </div>
      <div className="flex gap-4 items-center">
        <button type="submit" className="flex items-center gap-5 rounded-lg bg-yellow-200 px-6 py-3 text-sm font-medium transition-colors hover:bg-yellow-100 md:text-base">
          {t('save')}
        </button>
        <Link href="/books" className="text-sm text-gray-500">{t('cancel')}</Link>
      </div>
    </form>
  );
}