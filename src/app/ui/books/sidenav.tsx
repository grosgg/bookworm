import Link from 'next/link';
import NavLinks from '@/app/ui/books/nav-links';
import BookwormLogo from '@/app/ui/bookworm-logo';
import SignoutButton from '@/app/ui/signout-button';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-yellow-200 p-4 md:h-20"
        href="/"
      >
        <div className="w-60 md:w-60">
          <BookwormLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form>
          <SignoutButton />
        </form>
      </div>
    </div>
  );
}
