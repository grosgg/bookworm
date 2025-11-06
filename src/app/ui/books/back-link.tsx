import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function BackLink({ bookshelfId }: { bookshelfId: string | null }) {
  const path = bookshelfId ? `/bookshelves/${bookshelfId}` : '/bookshelves/default';
  return (
    <Link href={path} className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-100 transition">
      <ArrowLeftIcon className="w-4 h-4" />
    </Link>
  );
}