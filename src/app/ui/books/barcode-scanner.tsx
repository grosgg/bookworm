import { Scanner, IDetectedBarcode } from '@yudiel/react-qr-scanner';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function BarcodeScanner() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleScan = (detectedCodes: IDetectedBarcode[]) => {
    const barcode = detectedCodes[0].rawValue;
    if (barcode) {
      const params = new URLSearchParams(searchParams);
      params.set('searchType', 'isbn');
      params.set('query', barcode);
      params.set('page', '1');
      params.set('lang', 'en');
      replace(`${pathname}?${params.toString()}`);
    }
  };

  return (
    <Scanner
      onScan={handleScan}
      onError={(error: unknown) => console.error(error)}
      formats={['ean_13']}
    />
  );
}