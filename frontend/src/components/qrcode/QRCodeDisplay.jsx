import { useEffect, useState } from 'react';
import QRCode from 'qrcode';

export default function QRCodeDisplay({ data, size = 200 }) {
  const [qrImageUrl, setQrImageUrl] = useState('');

  useEffect(() => {
    if (data) {
      // Generate QR code as data URL (works better for printing)
      QRCode.toDataURL(data, {
        width: size,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      }).then((url) => {
        setQrImageUrl(url);
      });
    }
  }, [data, size]);

  return (
    <div className="flex flex-col items-center gap-4">
      {qrImageUrl && (
        <img
          src={qrImageUrl}
          alt="QR Code"
          className="border-4 border-gray-200 dark:border-gray-700 rounded-lg"
          style={{ width: size, height: size }}
        />
      )}
      <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">
        {data}
      </p>
    </div>
  );
}
