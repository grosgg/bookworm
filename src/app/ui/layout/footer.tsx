import LocaleLinks from "@/app/ui/layout/locale-links";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-50 py-4 rounded-lg">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} grosgg . <Link href="/about" className="text-yellow-500 hover:text-yellow-600">About</Link>
        </p>
        <div className="flex gap-2">
          <LocaleLinks />
        </div>
      </div>
    </footer>
  );
}