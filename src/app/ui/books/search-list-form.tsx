'use client';
import { useTranslations } from "next-intl";
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function BookSearchListForm() {
  const t = useTranslations('ui.searchForm');
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((query: string) => {
    const params = new URLSearchParams(searchParams);
    params.delete('page');
    if (query) {
      params.set('query', query);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 500);

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-2">
      <label htmlFor="query" className="font-medium text-lg">{t('search')}</label>
      <input
        type="text"
        name="query"
        className="rounded border border-gray-500 px-4 py-2 md:w-full"
        defaultValue={searchParams.get('query') || ''}
        onChange={(e) => {
          const target = e.target as HTMLInputElement;
          target.value = target.value.trim();
          handleSearch(target.value);
        }}
      />
    </div>
  );
}