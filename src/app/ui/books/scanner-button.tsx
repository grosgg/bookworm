export default function ScannerButton({ scannerDisplay, setScannerDisplay }: { scannerDisplay: boolean, setScannerDisplay: (scannerDisplay: boolean) => void }) {
  return (
    <button
      type="button"
      className="bg-yellow-200 hover:bg-yellow-100 rounded px-2 font-medium cursor-pointer"
      onClick={() => setScannerDisplay(!scannerDisplay)}
    >
      {scannerDisplay ? 'Stop Scanning' : 'Scan Barcode'}
    </button>
  );
}