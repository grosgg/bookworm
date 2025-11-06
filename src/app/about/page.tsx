import Image from "next/image";
import BookwormLogo from "@/app/ui/layout/bookworm-logo";
import { getTranslations } from 'next-intl/server';
import Footer from "@/app/ui/layout/footer";
import Link from "next/link";

export default async function AboutPage() {
  const t = await getTranslations('pages.about');
  return (
    <main className="flex min-h-screen flex-col p-6 gap-6">
      <div className="flex h-18 shrink-0 items-end rounded-lg bg-yellow-200 p-4 md:h-18">
        <Link href="/">
          <BookwormLogo />
        </Link>
      </div>
      <div className="flex grow flex-col gap-4 md:flex-row">
        <div className="mx-auto my-auto py-6">
          <Image
            src="/bookworm-glasses.png"
            width={400}
            height={400}
            alt="Wormy Boi"
          />
        </div>
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <p className={`text-2xl font-bold text-gray-800 antialiased`}>
            {t('welcome')}
          </p>
          <p className={`text-lg text-gray-800 antialiased`}>
            {t('content')}
          </p>
          <div className="flex flex-col gap-2">
            <Link href="/about/privacy" className="text-yellow-500 hover:text-yellow-600 cursor-pointer">
              {t('privacy')}
            </Link>
            <Link href="/about/terms" className="text-yellow-500 hover:text-yellow-600 cursor-pointer">
              {t('terms')}
            </Link>
          </div>
          <Link href="/" className="text-yellow-500 hover:text-yellow-600">
            {t('back')}
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
