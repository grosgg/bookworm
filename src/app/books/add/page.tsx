import BookSearchForm from "@/app/ui/books/search-api-form";
import BookSearchResults from "@/app/ui/books/search-results";
import { getTranslations } from 'next-intl/server';

export default async function AddBookPage(props: {
  searchParams?: Promise<{
    query?: string;
    searchType?: 'intitle' | 'isbn';
    lang?: 'en' | 'fr' | 'ja';
    page?: string;
  }>;
}) {
  const t = await getTranslations('pages.addBook');
  const searchParams = await props.searchParams;
  const query = searchParams?.query;
  const searchType = searchParams?.searchType;
  const lang = searchParams?.lang;
  const page = Number(searchParams?.page) || 1;
  return (
    <div>
      <h1 className="text-3xl font-bold">{t('title')}</h1>
      <div className="flex flex-col gap-8 mt-8">
        <BookSearchForm />
        {query && searchType && lang && (
          <BookSearchResults searchType={searchType} query={query} lang={lang} page={page} />
        )}
      </div>
    </div>
  );
}