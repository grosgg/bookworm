'use client';
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";
import clsx from 'clsx';

export default function Pagination({ page, totalPages }: { page: number; totalPages: number }) {
  const t = useTranslations('ui.pagination');
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handlePrevious = () => {
    const params = new URLSearchParams(searchParams);
    params.set('page', (page - 1).toString());
    replace(`${pathname}?${params.toString()}`);
  };

  const handleNext = () => {
    const params = new URLSearchParams(searchParams);
    params.set('page', (page + 1).toString());
    replace(`${pathname}?${params.toString()}`);
  };
  return (
    <div className="flex justify-center items-center gap-2">
      <button
        onClick={handlePrevious}
        className={clsx("link cursor-pointer", {
          'text-yellow-500': page > 1,
          'text-gray-500': page <= 1,
        })}
        disabled={page <= 1}
      >
        {t('previous')}
      </button>
      <span className="text-sm text-gray-500">{page} / {totalPages}</span>
      <button
        onClick={handleNext}
        className={clsx("link cursor-pointer", {
          'text-yellow-500': page < totalPages,
          'text-gray-500': page >= totalPages,
        })}
        disabled={page >= totalPages}
      >
        {t('next')}
      </button>
    </div>
  );
}