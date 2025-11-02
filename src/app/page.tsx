import Image from "next/image";
import BookwormLogo from "@/app/ui/layout/bookworm-logo";
import SigninButton from "@/app/ui/auth/signin-button";
import { getTranslations } from 'next-intl/server';
import Footer from "@/app/ui/layout/footer";

export default async function Page() {
  const t = await getTranslations('pages.front');
  return (
    <main className="flex min-h-screen flex-col p-6 gap-6">
      <div className="flex h-18 shrink-0 items-end rounded-lg bg-yellow-200 p-4 md:h-18">
        <BookwormLogo />
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
          <p className={`text-xl text-gray-800 md:text-3xl md:leading-normal antialiased`}>
            {t('hero')}
          </p>
          <SigninButton />
        </div>
      </div>
      <Footer />
    </main>
  );
}
