import { getBookshelfById } from "@/app/lib/data";
import { BookshelfType } from "@/app/lib/definitions";

export default async function EditBookshelfPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const bookshelf: BookshelfType = await getBookshelfById(params.id);

  return (
    <div>
      <h1 className="text-3xl font-bold">Edit {bookshelf.name}</h1>
    </div>
  );
}