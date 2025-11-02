import NavLinks from '@/app/ui/layout/nav-links';
import BookwormLogo from '@/app/ui/layout/bookworm-logo';
import SignoutButton from '@/app/ui/auth/signout-button';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col">
      <div
        className="mb-2 flex h-18 items-end justify-start rounded-md bg-yellow-200 p-4 md:h-40"
      >
        <div className="w-60 md:w-60">
          <BookwormLogo />
        </div>
      </div>
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
