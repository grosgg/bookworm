import { getBookshelfById } from "@/app/lib/data";
import { ActionStateType, BookshelfType } from "@/app/lib/definitions";
import { editBookshelfAction } from "@/app/lib/actions";
import { getTranslations } from 'next-intl/server';
import BookshelfForm from "@/app/ui/bookshelf/form";

export default async function EditBookshelfPage(props: { params: Promise<{ id: string }> }) {
  const t = await getTranslations('pages.editBookshelf');
  const params = await props.params;
  const bookshelf: BookshelfType = await getBookshelfById(params.id);
  const editBookshelfActionWithId: (_previousState: ActionStateType, formData: FormData) => Promise<ActionStateType> = editBookshelfAction.bind(null, params.id);

  return (
    <div>
      <h1 className="text-3xl font-bold">{t('title', { name: bookshelf.name })}</h1>
      <BookshelfForm action={editBookshelfActionWithId} bookshelf={bookshelf} />
    </div>
  );
}