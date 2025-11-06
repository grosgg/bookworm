'use client';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import BarcodeScanner from '@/app/ui/books/barcode-scanner';
import ScannerButton from '@/app/ui/books/scanner-button';
import { useTranslations } from 'next-intl';

export default function BookSearchForm() {
  const t = useTranslations('ui.searchForm');
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [scannerButtonDisplay, setScannerButtonDisplay] = useState<boolean>(false);
  const [scannerDisplay, setScannerDisplay] = useState<boolean>(false);
  const [barcode, setBarcode] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const searchType = formData.get('searchType') as 'title' | 'isbn';
    const query = formData.get('query') as string;
    const lang = formData.get('lang') as 'en' | 'fr' | 'ja';

    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set('searchType', searchType);
      params.set('query', query);
      params.set('lang', lang);
      params.set('page', '1');
    } else {
      params.delete('searchType');
      params.delete('query');
      params.delete('lang');
      params.delete('page');
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
      <fieldset className="flex gap-4 items-center">
        <legend className="font-semibold mb-1 flex items-center gap-4">
          {t('searchBy')}
          <label className="flex items-center gap-2 font-normal">
            <input
              type="radio"
              name="searchType"
              value="intitle"
              defaultChecked={searchParams.get('searchType') !== 'isbn'}
              onChange={() => {
                setScannerButtonDisplay(false);
                setScannerDisplay(false);
              }}
              className="accent-yellow-300"
            />
            {t('title')}
          </label>
          <label className="flex items-center gap-2 font-normal">
            <input
              type="radio"
              name="searchType"
              value="isbn"
              defaultChecked={searchParams.get('searchType') === 'isbn'}
              onChange={() => setScannerButtonDisplay(true)}
              className="accent-yellow-300"
            />
            {t('isbn')}
          </label>
          {scannerButtonDisplay && <ScannerButton scannerDisplay={scannerDisplay} setScannerDisplay={setScannerDisplay} />}
        </legend>
      </fieldset>
      {/* Language radio buttons */}
      <fieldset className="flex gap-4 items-center">
        <legend className="font-semibold mb-1 flex items-center gap-4">
          {t('language')}
          <label className="flex items-center gap-2 font-normal">
            <input
              type="radio"
              name="lang"
              value="en"
              defaultChecked={searchParams.get('lang') === null || searchParams.get('lang') === 'en'}
              className="accent-yellow-300"
            />
            {t('english')}
          </label>
          <label className="flex items-center gap-2 font-normal">
            <input
              type="radio"
              name="lang"
              value="fr"
              defaultChecked={searchParams.get('lang') === 'fr'}
              className="accent-yellow-300"
            />
            {t('french')}
          </label>
          <label className="flex items-center gap-2 font-normal">
            <input
              type="radio"
              name="lang"
              value="ja"
              defaultChecked={searchParams.get('lang') === 'ja'}
              className="accent-yellow-300"
            />
            {t('japanese')}
          </label>
        </legend>
      </fieldset>
      <input
        type="text"
        id="search-input"
        name="query"
        className="border rounded px-3 py-2"
        placeholder={t('searchPlaceholder')}
        required
        minLength={3}
        onBlur={e => {
          const target = e.target as HTMLInputElement;
          target.value = target.value.trim();
        }}
        defaultValue={barcode || searchParams.get('query') || ''}
      />
      {scannerDisplay && <BarcodeScanner setBarcode={setBarcode} />}
      <button
        type="submit"
        className="mt-2 bg-yellow-200 hover:bg-yellow-100 text-black rounded px-4 py-2 font-medium cursor-pointer"
      >
        {t('search')}
      </button>
    </form>
  );
}