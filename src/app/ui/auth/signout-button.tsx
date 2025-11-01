'use client';
import { signOut, useSession } from "@/app/lib/auth-client";
import { PowerIcon } from '@heroicons/react/24/outline';

export default function SignoutButton() {
  const { refetch } = useSession();

  return (
    <button
      onClick={async () => {
        try {
          await signOut();
          // Invalidate session cache
          refetch();
          // Force hard reload to completely clear state and cookies
          window.location.href = '/';
        } catch (error) {
          console.error('Sign out error:', error);
          // Even if signOut fails, force navigation
          window.location.href = '/';
        }
      }}
      className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-yellow-100 hover:text-yellow-600 md:flex-none md:justify-start md:p-2 md:px-3 cursor-pointer"
    >
      <PowerIcon className="w-6" />
      <div className="hidden md:block">Sign Out</div>
    </button>
  );
}