import { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

/**
 * QRPrintModal - Compact design for Brother QL-810W
 *
 * Layout:
 * - Name (48px, bold)
 * - QR Code (45×45mm = 500×500px)
 * - Date (32px)
 *
 * Total: 62mm breed × ~60mm high
 */
export default function QRPrintModal({ data, title, date, onClose, onPrint }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    // Canvas size: 62mm breed × 60mm high
    // @ 300 DPI: 696×700 pixels
    canvas.width = 696;
    canvas.height = 700;

    // White background
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';

    let currentY = 55; // Start position

    // ========================================
    // SPECIES NAME / TITLE
    // ========================================
    ctx.font = 'bold 48px Arial';

    // Text wrapping for long names
    const maxWidth = canvas.width - 40;
    const titleLines = wrapText(ctx, title, maxWidth);

    titleLines.forEach((line) => {
      ctx.fillText(line, canvas.width / 2, currentY);
      currentY += 55; // Line height
    });

    currentY += 20; // Gap between title and QR

    // ========================================
    // QR CODE (45×45mm = 500×500px)
    // ========================================
    const qrSize = 500;
    const qrX = (canvas.width - qrSize) / 2;

    QRCode.toDataURL(data, {
      width: qrSize,
      margin: 1,
      errorCorrectionLevel: 'M',
    })
      .then((url) => {
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, qrX, currentY, qrSize, qrSize);

          currentY += qrSize + 25; // Move below QR code

          // ========================================
          // DATE
          // ========================================
          if (date) {
            ctx.font = 'bold 32px Arial';
            ctx.fillText(date, canvas.width / 2, currentY);
          }
        };
        img.src = url;
      })
      .catch((err) => console.error('QR generation failed:', err));
  }, [data, title, date]);

  /**
   * Wrap text to fit within maxWidth
   */
  function wrapText(ctx, text, maxWidth) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';

    words.forEach((word) => {
      const testLine = currentLine + word + ' ';
      const metrics = ctx.measureText(testLine);

      if (metrics.width > maxWidth && currentLine !== '') {
        lines.push(currentLine.trim());
        currentLine = word + ' ';
      } else {
        currentLine = testLine;
      }
    });

    if (currentLine) {
      lines.push(currentLine.trim());
    }

    return lines;
  }

  const handleDownload = () => {
    const canvas = canvasRef.current;
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `qr-${data.replace(':', '-')}.png`;
    link.href = url;
    link.click();
    onPrint();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-2xl">
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
          QR Code Label
        </h3>

        {/* Preview */}
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-4">
          <canvas ref={canvasRef} className="w-full h-auto" />
        </div>

        {/* Download Button */}
        <button
          onClick={handleDownload}
          className="w-full px-4 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 
          hover:from-teal-600 hover:to-cyan-600 text-white rounded-lg font-semibold mb-3 shadow-lg"
        >
          💾 Download QR Label
        </button>

        {/* Instructions */}
        <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-sm">
          <p className="text-gray-700 dark:text-gray-300 mb-2 font-semibold">
            🖨️ Printen:
          </p>
          <ol className="text-gray-600 dark:text-gray-400 space-y-1 text-xs ml-4 list-decimal">
            <li>Download PNG</li>
            <li>Open Brother iPrint&Label app</li>
            <li>Print op 62mm label (DK-22205)</li>
          </ol>
          <p className="text-gray-500 dark:text-gray-500 text-xs mt-2">
            📏 Label: 62×60mm | QR: 45×45mm
          </p>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 
          dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          Sluiten
        </button>
      </div>
    </div>
  );
}
