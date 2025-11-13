'use client';
import { BookType } from "@/app/lib/definitions";
import { deleteBookAction } from "@/app/lib/actions/books";
import { useTranslations } from "next-intl";
import { useState } from "react";
import ConfirmationDialog from "../layout/confirmation-dialog";
import { handleActionResponse } from "@/app/lib/actionResponseHandler";

export default function DeleteLink({ book }: { book: BookType }) {
  const t = useTranslations('ui.deleteBookButton');
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false);
  const deleteBook = async () => {
    const result = await deleteBookAction(book.id);
    setIsConfirmationDialogOpen(false);
    handleActionResponse(result);
  }
  return (
    <>
      <button
        onClick={() => setIsConfirmationDialogOpen(true)}
        className="text-sm text-red-300 hover:text-red-400 cursor-pointer"
      >
        {t('delete')}
      </button>
      <ConfirmationDialog
        isOpen={isConfirmationDialogOpen}
        title={t('deleteConfirmationTitle')}
        message={t('deleteConfirmationMessage', { title: book.title })}
        onConfirm={deleteBook}
        onCancel={() => setIsConfirmationDialogOpen(false)}
      />
    </>
  );
}