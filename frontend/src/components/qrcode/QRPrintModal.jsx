import QRCodeDisplay from './QRCodeDisplay';

export default function QRPrintModal({ data, title, onClose, onPrint }) {
  const handleDownloadPNG = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Brother QL-700 uses 62mm wide labels
    // Optimal size: 696px width (62mm at 285dpi)
    // Height flexible based on label type (we use 29mm = 326px)
    canvas.width = 696;
    canvas.height = 696; // Square for 62mm x 62mm label (or use 326 for 62mm x 29mm)

    // White background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Get the QR image
    const qrImg = document.querySelector('.qr-print-area img');
    if (qrImg) {
      // Draw title at top
      ctx.fillStyle = '#000000';
      ctx.font = 'bold 28px Arial';
      ctx.textAlign = 'center';

      // Wrap title if too long
      const maxWidth = canvas.width - 40;
      const words = title.split(' ');
      let line = '';
      let y = 50;

      for (let word of words) {
        const testLine = line + word + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && line !== '') {
          ctx.fillText(line, canvas.width / 2, y);
          line = word + ' ';
          y += 35;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, canvas.width / 2, y);

      // Draw QR code (centered, optimized size for scanning)
      const qrSize = 450;
      const x = (canvas.width - qrSize) / 2;
      const qrY = y + 30;
      ctx.drawImage(qrImg, x, qrY, qrSize, qrSize);

      // Draw data text below QR (smaller, readable)
      ctx.font = '18px monospace';
      ctx.fillText(data, canvas.width / 2, qrY + qrSize + 35);

      // Download as PNG
      const link = document.createElement('a');
      const filename = `qr-${data.replace(':', '-')}.png`;
      link.download = filename;
      link.href = canvas.toDataURL('image/png');
      link.click();

      console.log(`✅ QR code saved as: ${filename}`);
    }

    onPrint();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl max-w-sm w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            QR Code Opslaan
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-2xl leading-none"
            aria-label="Sluiten"
          >
            ✕
          </button>
        </div>

        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
          Sla de QR code op voor <span className="font-semibold">{title}</span>
        </p>

        <div className="qr-print-area mb-6 bg-white p-4 rounded-lg border-2 border-gray-200">
          <QRCodeDisplay data={data} size={200} />
        </div>

        <div className="space-y-3">
          <button
            onClick={handleDownloadPNG}
            className="w-full px-6 py-4 rounded-xl font-semibold text-lg
            bg-linear-to-r from-teal-500 to-cyan-500 
            hover:from-teal-600 hover:to-cyan-600
            active:from-teal-700 active:to-cyan-700
            text-white shadow-md
            transform active:scale-95
            transition-all duration-200"
          >
            💾 Download QR Label
          </button>

          <button
            onClick={onClose}
            className="w-full px-6 py-4 rounded-xl font-semibold text-lg
            bg-gray-200 dark:bg-gray-700
            hover:bg-gray-300 dark:hover:bg-gray-600
            active:bg-gray-400 dark:active:bg-gray-500
            text-gray-700 dark:text-gray-300
            shadow-md
            transform active:scale-95
            transition-all duration-200"
          >
            Later
          </button>
        </div>
      </div>
    </div>
  );
}
