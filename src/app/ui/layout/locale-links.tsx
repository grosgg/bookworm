'use client';
import { setLocaleAction } from "@/app/lib/actions";

export default function LocaleLinks() {
  return (
    <>
      <a
        className="text-sm text-yellow-400 hover:underline cursor-pointer"
        onClick={async () => {
          await setLocaleAction('en');
          window.location.reload();
        }}
      >
        English
      </a>
      <span className="text-sm text-gray-400">|</span>
      <a
        className="text-sm text-yellow-400 hover:underline cursor-pointer"
        onClick={async () => {
          await setLocaleAction('fr');
          window.location.reload();
        }}
      >
        Français
      </a>

    </>
  );
}