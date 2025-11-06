import Link from "next/link";
import BookwormLogo from "@/app/ui/layout/bookworm-logo";

export default function TermsPage() {
  return (
    <main className="flex-col gap-6 p-6">
      <div className="flex h-18 shrink-0 items-end rounded-lg bg-yellow-200 p-4 md:h-18">
        <Link href="/">
          <BookwormLogo />
        </Link>
      </div>

      <section className="w-full max-w-3xl bg-white/90 rounded-xl shadow p-6 md:p-10 m-6 mx-auto prose prose-headings:text-gray-800 prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg prose-h4:font-semibold prose-p:text-gray-700 prose-li:text-gray-700 prose-a:text-yellow-600 prose-a:underline">
        <h2 className="mb-2 text-2xl font-bold">Terms and Conditions &mdash; Bookworm</h2>
        <p className="text-xs text-gray-400 italic mb-4">
          <strong className="font-bold not-italic text-gray-600">Last updated:</strong> 2025-11-07
        </p>
        <p>
          Welcome to Bookworm (<span className="italic">&quot;the App&quot;</span>). By accessing or using this personal library application, you agree to be bound by these Terms and Conditions (<span className="italic">&quot;Terms&quot;</span>). If you disagree with any part of these Terms, please do not use the App.
        </p>

        <h3 className="mt-8">1. Acceptance of Terms</h3>
        <p>
          By using Bookworm, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you must not use the App.
        </p>

        <h3 className="mt-8">2. Description of Service</h3>
        <p>
          Bookworm is a personal library management application that allows you to:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Search for books using the Google Books API</li>
          <li>Create and manage your personal book collection</li>
          <li>Organize books into custom bookshelves</li>
          <li>Track reading status and other book-related information</li>
        </ul>

        <h3 className="mt-8">3. User Accounts</h3>
        <p>
          If the App requires user accounts:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>You are responsible for maintaining the confidentiality of your account credentials</li>
          <li>You agree to provide accurate, current, and complete information during registration</li>
          <li>You are responsible for all activities that occur under your account</li>
          <li>You must notify us immediately of any unauthorized use of your account</li>
        </ul>

        <h3 className="mt-8">4. User Content and Conduct</h3>
        <p>You are solely responsible for the content you add to the App, including:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Books you add to your collection</li>
          <li>Bookshelves you create</li>
          <li>Any notes, ratings, or other information you provide</li>
        </ul>
        <p className="mt-4">
          You agree not to use the App to:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Violate any applicable laws or regulations</li>
          <li>Infringe upon the intellectual property rights of others</li>
          <li>Upload malicious code, viruses, or harmful content</li>
          <li>Interfere with or disrupt the App&apos;s functionality</li>
        </ul>

        <h3 className="mt-8">5. Intellectual Property</h3>
        <p>
          The App and its original content, features, and functionality are owned by Bookworm and are protected by international copyright, trademark, and other intellectual property laws.
        </p>
        <p className="mt-4">
          Book information, including cover images and descriptions, is provided by the Google Books API and is subject to Google&apos;s terms of service and applicable copyright laws.
        </p>

        <h3 className="mt-8">6. Third-Party Services</h3>
        <p>
          Bookworm uses the Google Books API to provide book information. Your use of the App is also subject to Google&apos;s Terms of Service:
        </p>
        <p>
          <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="text-yellow-500 underline hover:text-yellow-600">
            https://policies.google.com/terms
          </a>
        </p>
        <p>
          We are not responsible for the availability, accuracy, or content of third-party services.
        </p>

        <h3 className="mt-8">7. Disclaimer of Warranties</h3>
        <p>
          The App is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, either express or implied. We do not guarantee that:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>The App will be uninterrupted, secure, or error-free</li>
          <li>Any defects or errors will be corrected</li>
          <li>The App is free of viruses or other harmful components</li>
        </ul>

        <h3 className="mt-8">8. Limitation of Liability</h3>
        <p>
          To the fullest extent permitted by law, Bookworm shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your use of the App.
        </p>

        <h3 className="mt-8">9. Termination</h3>
        <p>
          We reserve the right to suspend or terminate your access to the App at any time, with or without cause or notice, for any reason, including if you breach these Terms.
        </p>
        <p className="mt-4">
          You may stop using the App at any time. If you have an account, you may request deletion of your account and associated data.
        </p>

        <h3 className="mt-8">10. Changes to Terms</h3>
        <p>
          We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
        </p>
        <p className="mt-4">
          By continuing to access or use the App after any revisions become effective, you agree to be bound by the revised terms.
        </p>

        <h3 className="mt-8">11. Governing Law</h3>
        <p>
          These Terms shall be governed by and construed in accordance with applicable laws, without regard to its conflict of law provisions.
        </p>

        <h3 className="mt-8">12. Contact Information</h3>
        <p>
          If you have any questions about these Terms, please contact us through the App or visit our <Link href="/about" className="text-yellow-500 underline hover:text-yellow-600">About</Link> page.
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

