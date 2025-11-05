'use client';
import { BookType } from "@/app/lib/definitions";
import { deleteBookAction } from "@/app/lib/actions";
import { useTranslations } from "next-intl";
import { useState } from "react";
import ConfirmationDialog from "../layout/confirmation-dialog";
import { TrashIcon } from "@heroicons/react/24/outline";
import { handleActionResponse } from "@/app/lib/actionResponseHandler";

export default function DeleteButton({ book }: { book: BookType }) {
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
        className="bg-red-400 text-white px-4 py-2 rounded-md hover:bg-red-300"
      >
        <TrashIcon className="w-4 h-4" />
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