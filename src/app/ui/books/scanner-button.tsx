'use client';
import { useTranslations } from 'next-intl';

export default function ScannerButton({ scannerDisplay, setScannerDisplay }: { scannerDisplay: boolean, setScannerDisplay: (scannerDisplay: boolean) => void }) {
  const t = useTranslations('ui.scannerButton');
  return (
    <button
      type="button"
      className="bg-yellow-200 hover:bg-yellow-100 rounded px-2 font-medium cursor-pointer"
      onClick={() => setScannerDisplay(!scannerDisplay)}
    >
      {scannerDisplay ? t('stopScanning') : t('scanBarcode')}
    </button>
  );
}