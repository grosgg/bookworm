import BookSearchForm from "@/app/ui/books/search-form";
import BookSearchResults from "@/app/ui/books/search-results";

export default async function AddBookPage(props: {
  searchParams?: Promise<{
    query?: string;
    searchType?: 'intitle' | 'isbn';
    lang?: 'en' | 'fr' | 'ja';
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query;
  const searchType = searchParams?.searchType;
  const lang = searchParams?.lang;
  return (
    <div>
      <h1 className="text-3xl font-bold">Add Book</h1>
      <div className="flex flex-col gap-8 mt-8">
        <BookSearchForm />
        {query && searchType && lang && (
          <BookSearchResults searchType={searchType} query={query} lang={lang} />
        )}
      </div>
    </div>
  );
}