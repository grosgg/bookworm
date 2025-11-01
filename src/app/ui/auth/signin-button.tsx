'use client';
import { useState } from "react";
import { signIn, useSession } from "@/app/lib/auth-client";
import Link from "next/link";
import { ArrowRightIcon, KeyIcon } from "@heroicons/react/24/outline";

export default function SigninButton() {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  if (session) {
    return (
      <Link
        href="/home"
        className="flex items-center gap-5 self-start rounded-lg bg-yellow-200 px-6 py-3 text-sm font-medium transition-colors hover:bg-yellow-100 md:text-base cursor-pointer"
      >
        Go to Dashboard
        <ArrowRightIcon className="w-6" />
      </Link>
    );
  }

  return (
    <button
      disabled={loading}
      onClick={async () => {
        await signIn.social(
          {
            provider: "google",
            callbackURL: "/home"
          },
          {
            onRequest: () => {
              setLoading(true);
            },
            onResponse: () => {
              setLoading(false);
            },
          },
        );
      }}
      className="flex items-center gap-5 self-start rounded-lg bg-yellow-200 px-6 py-3 text-sm font-medium transition-colors hover:bg-yellow-100 md:text-base cursor-pointer"
    >
      Sign In With Google
      <KeyIcon className="w-6" />
    </button>
  );
}