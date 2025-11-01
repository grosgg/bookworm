'use client';
import { signOut } from "@/app/lib/auth-client";
import { PowerIcon } from '@heroicons/react/24/outline';

export default function SignoutButton() {
  return (
    <button
      onClick={async () => {
        await signOut();
        // Force a hard reload to clear all client-side state and cookies
        console.log('Signed Out.');
        window.location.href = '/';
      }}
      className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-yellow-100 hover:text-yellow-600 md:flex-none md:justify-start md:p-2 md:px-3"
    >
      <PowerIcon className="w-6" />
      <div className="hidden md:block">Sign Out</div>
    </button>
  );
}