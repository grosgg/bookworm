import { createBookshelfAction } from '@/app/lib/actions';

export default function CreateBookshelfPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Create Bookshelf</h1>
      <form action={createBookshelfAction} className="mt-6 flex flex-col gap-6 max-w-md">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="font-medium text-lg">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Bookshelf Name"
            required
            className="rounded border px-4 py-2"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="visibility" className="font-medium text-lg">
            Visibility
          </label>
          <select
            id="visibility"
            name="visibility"
            defaultValue="private"
            className="rounded border px-4 py-2"
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>
        <button
          type="submit"
          className="flex items-center gap-5 self-start rounded-lg bg-yellow-200 px-6 py-3 text-sm font-medium transition-colors hover:bg-yellow-100 md:text-base"
        >
          Create
        </button>
      </form>
    </div>
  );
}