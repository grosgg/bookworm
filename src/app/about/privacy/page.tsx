import Link from "next/link";
import BookwormLogo from "@/app/ui/layout/bookworm-logo";

export default function PrivacyPage() {
  return (
    <main className="flex-col gap-6 p-6">
      <div className="flex h-18 shrink-0 items-end rounded-lg bg-yellow-200 p-4 md:h-18">
        <Link href="/">
          <BookwormLogo />
        </Link>
      </div>

      <section className="w-full max-w-3xl bg-white/90 rounded-xl shadow p-6 md:p-10 m-6 mx-auto prose prose-headings:text-gray-800 prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg prose-h4:font-semibold prose-p:text-gray-700 prose-li:text-gray-700 prose-a:text-yellow-600 prose-a:underline">
        <h2 className="mb-2 text-2xl font-bold">Privacy Policy &mdash; Bookworm</h2>
        <p className="text-xs text-gray-400 italic mb-4">
          <strong className="font-bold not-italic text-gray-600">Last updated:</strong> 2025-11-07
        </p>
        <p>
          Bookworm (<span className="italic">&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;</span>) values your privacy.
          This Privacy Policy explains how we handle information when you use our personal library app (<span className="italic">&quot;the App&quot;</span>).
        </p>

        <h3 className="mt-8">1. Information We Collect</h3>
        <p>
          Bookworm is designed to respect your privacy and collect only the minimal data necessary to function.
        </p>

        <h4 className="mt-6">1.1. Information from Google Books API</h4>
        <p>
          When you search for or add a book, the App fetches publicly available book details (such as title, author, cover image, and description) from the Google Books API.<br />
          <span className="font-bold">No personal data is shared with Google</span> when performing these requests.
        </p>

        <h4 className="mt-4">1.2. Information you provide</h4>
        <p>If the App allows user accounts, we may collect:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Email address and password <span className="text-gray-500 text-xs">(for authentication)</span></li>
          <li>Your books and bookshelves <span className="text-gray-500 text-xs">(to sync between devices)</span></li>
        </ul>

        <h4 className="mt-4">1.3. Automatically collected information</h4>
        <p>We may collect basic, non-identifying technical data, such as:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Device type and operating system version</li>
          <li>App version and crash logs <span className="text-gray-500 text-xs">(for debugging and improvement)</span></li>
        </ul>
        <p>
          <span className="font-semibold">No personally identifying analytics or tracking data is collected without your consent.</span>
        </p>

        <h3 className="mt-8">2. How We Use Information</h3>
        <p>We use the collected information solely to:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Display accurate book information from the Google Books API</li>
          <li>Maintain and improve app functionality</li>
          <li>Sync user preferences or library data</li>
          <li>Diagnose crashes or technical issues</li>
        </ul>
        <p>
          <span className="font-semibold">We never sell or rent your personal information.</span>
        </p>

        <h3 className="mt-8">3. Data Storage and Security</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            If account-based syncing is offered, your data may be stored securely on our servers or through trusted third-party providers.
          </li>
        </ul>
        <p>
          We use industry-standard security measures <span className="italic text-sm">(encryption, access controls)</span> to protect your data.
        </p>

        <h3 className="mt-8">4. Third-Party Services</h3>
        <p>
          Bookworm uses the Google Books API to fetch public book information.<br />
          By using the App, you also agree to Google’s privacy policy:<br />
          <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-yellow-500 underline hover:text-yellow-600">
            https://policies.google.com/privacy
          </a>
        </p>
        <p>
          Other than the Google Books API, no third-party services receive your personal data.
        </p>

        <h3 className="mt-8">5. Your Rights</h3>
        <p>You have the right to:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Access, modify, or delete your personal data <span className="text-gray-500 text-xs">(if accounts exist)</span></li>
          <li>Delete your account and associated data permanently</li>
        </ul>

        <h3 className="mt-8">6. Children’s Privacy</h3>
        <p>
          Bookworm is not intended for children under 13. We do not knowingly collect personal data from children.
        </p>

        <h3 className="mt-8">7. Changes to This Policy</h3>
        <p>
          We may update this Privacy Policy as the App evolves. The latest version will always be available within the App.
        </p>
      </section>
      <div className="flex justify-center">
        <Link href="/about" className="text-yellow-500 hover:text-yellow-600 cursor-pointer">
          Back
        </Link>
      </div>
    </main>
  );
}