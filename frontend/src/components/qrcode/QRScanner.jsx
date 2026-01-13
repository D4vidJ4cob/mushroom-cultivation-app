import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect } from 'react';
import { useAuth } from '../../contexts/auth';

export default function QRScanner({ onScan, onClose }) {
  const { isAuthed } = useAuth();

  useEffect(() => {
    if (!isAuthed) return;
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    });

    scanner.render(success, error);

    function success(result) {
      scanner.clear().then(() => onScan(result));
    }

    function error(err) {
      if (err.includes && !err.includes('NotFoundException')) {
        console.warn(err);
      }
    }

    return () => {
      scanner.clear().catch(() => {});
    };

  }, [isAuthed]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Scan QR Code</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-2xl"
          >
            ✕
          </button>
        </div>
        
        <div id="reader" />
      </div>
    </div>
  );
}