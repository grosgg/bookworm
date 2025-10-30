'use client';
import { useRouter } from "next/navigation";
import { signOut } from "@/app/lib/auth-client";
import { PowerIcon } from '@heroicons/react/24/outline';

export default function SignoutButton() {
  const router = useRouter();

  return (
    <button
      onClick={async () => {
        await signOut();
        router.push('/');
        router.refresh();
      }}
      className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-yellow-100 hover:text-yellow-600 md:flex-none md:justify-start md:p-2 md:px-3"
    >
      <PowerIcon className="w-6" />
      <div className="hidden md:block">Sign Out</div>
    </button>
  );
}