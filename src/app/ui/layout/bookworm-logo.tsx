import { BookOpenIcon } from "@heroicons/react/24/outline";

export default function BookwormLogo() {
  return (
    <div className="flex items-center gap-2">
      <BookOpenIcon className="h-10 w-10" />
      <span className="text-3xl font-bold">Bookworm</span>
    </div>
  );
}