'use client';
import { BookType } from "@/app/lib/definitions";
import { addBookToCollectionAction } from "@/app/lib/actions";
import { useTranslations } from "next-intl";
import { useActionState, useEffect } from "react";
import { handleActionResponse } from "@/app/lib/actionResponseHandler";
import Spinner from "@/app/ui/layout/spinner";

export default function AddToCollectionButton({ book, isInCollection }: { book: BookType, isInCollection: boolean }) {
  const t = useTranslations('ui.addToCollectionButton');
  const [formState, formAction, pending] = useActionState(addBookToCollectionAction, { success: false, message: '', toast: false, redirect: '' });
  useEffect(() => {
    handleActionResponse(formState);
  }, [formState]);

  if (isInCollection || formState.success) {
    return <p className="text-sm text-gray-500">{t('inCollection')}</p>;
  }

  return (
    <form action={formAction}>
      <input type="hidden" name="title" value={book.title} />
      <input type="hidden" name="author" value={book.author} />
      <input type="hidden" name="isbn" value={book.isbn} />
      <input type="hidden" name="coverUrl" value={book.coverUrl} />
      <input type="hidden" name="pages" value={book.pages} />
      <input type="hidden" name="year" value={book.year} />
      <input type="hidden" name="publisher" value={book.publisher} />
      <input type="hidden" name="description" value={book.description} />
      <input type="hidden" name="language" value={book.language} />

      <button type="submit" className="mt-2 bg-yellow-200 hover:bg-yellow-100 text-black flex items-center gap-2 rounded px-4 py-2 font-medium">
        {t('addToCollection')}
        {pending && <Spinner />}
      </button>
    </form>
  );
}