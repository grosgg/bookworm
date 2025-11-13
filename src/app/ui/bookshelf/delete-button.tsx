'use client';
import { BookshelfType } from "@/app/lib/definitions";
import { deleteBookshelfAction } from "@/app/lib/actions/bookshelves";
import { useTranslations } from "next-intl";
import { useState } from "react";
import ConfirmationDialog from "../layout/confirmation-dialog";
import { TrashIcon } from "@heroicons/react/24/outline";
import { handleActionResponse } from "@/app/lib/actionResponseHandler";

export default function DeleteButton({ bookshelf }: { bookshelf: BookshelfType }) {
  const t = useTranslations('ui.deleteBookshelfButton');
  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] = useState(false);
  const deleteBookshelf = async () => {
    const result = await deleteBookshelfAction(bookshelf.id);
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
        message={t('deleteConfirmationMessage', { name: bookshelf.name })}
        onConfirm={deleteBookshelf}
        onCancel={() => setIsConfirmationDialogOpen(false)}
      />
    </>
  );
}