import { Scanner, IDetectedBarcode } from '@yudiel/react-qr-scanner';

export default function BarcodeScanner({ setBarcode }: { setBarcode: (barcode: string) => void }) {
  const handleScan = (detectedCodes: IDetectedBarcode[]) => {
    const barcode = detectedCodes[0].rawValue;
    if (barcode) {
      setBarcode(barcode);
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