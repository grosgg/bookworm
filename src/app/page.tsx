import Image from "next/image";
import BookwormLogo from "@/app/ui/bookworm-logo";
import SigninButton from "@/app/ui/signin-button";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-18 shrink-0 items-end rounded-lg bg-yellow-200 p-4 md:h-18">
        <BookwormLogo />
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="mx-auto my-auto py-6">
          <Image
            src="/bookworm-glasses.png"
            width={500}
            height={500}
            alt="Bookworm Mascot, Wormy Boy"
          />
        </div>
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <p className={`text-xl text-gray-800 md:text-3xl md:leading-normal antialiased`}>
            Welcome to <strong>Bookworm</strong>, the digital bookshelf for your reading journey.
          </p>
          <SigninButton />
        </div>
      </div>
    </main>
  );
}
