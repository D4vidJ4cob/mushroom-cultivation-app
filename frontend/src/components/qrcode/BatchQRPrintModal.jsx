import { useRef, useEffect, useState } from 'react';
import QRCode from 'qrcode';

const CANVAS_WIDTH = 696;
const CANVAS_HEIGHT = 700;

function renderLabel(canvas, { data, title, date }) {
  return new Promise((resolve, reject) => {
    const ctx = canvas.getContext('2d');
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';

    let currentY = 55;

    ctx.font = 'bold 48px Arial';
    const maxWidth = canvas.width - 40;
    const titleLines = wrapText(ctx, title, maxWidth);

    titleLines.forEach((line) => {
      ctx.fillText(line, canvas.width / 2, currentY);
      currentY += 55;
    });

    currentY += 20;

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
          currentY += qrSize + 25;

          if (date) {
            ctx.font = 'bold 32px Arial';
            ctx.fillText(date, canvas.width / 2, currentY);
          }

          resolve();
        };
        img.src = url;
      })
      .catch(reject);
  });
}

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

export default function BatchQRPrintModal({
  items,
  type,
  titleFn,
  dateFn,
  onClose,
}) {
  const canvasRefs = useRef([]);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    const renderAll = async () => {
      for (let i = 0; i < items.length; i++) {
        const canvas = canvasRefs.current[i];
        if (!canvas) continue;

        const item = items[i];
        await renderLabel(canvas, {
          data: `${type}:${item.id}`,
          title: titleFn(item),
          date: dateFn(item),
        });
      }
      setRendered(true);
    };

    renderAll();
  }, [items, type, titleFn, dateFn]);

  const handleDownloadAll = () => {
    canvasRefs.current.forEach((canvas, i) => {
      if (!canvas) return;
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `qr-${type}-${items[i].id}.png`;
      link.href = url;
      link.click();
    });
  };

  const handleDownloadSingle = (index) => {
    const canvas = canvasRefs.current[index];
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `qr-${type}-${items[index].id}.png`;
    link.href = url;
    link.click();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-4xl w-full 
      shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
          Batch QR Labels ({items.length} items)
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
          {items.length} new {type} entries created (IDs:{' '}
          {items.map((i) => `#${i.id}`).join(', ')})
        </p>

        {/* Download All Button */}
        <button
          onClick={handleDownloadAll}
          disabled={!rendered}
          className="w-full px-4 py-3 bg-gradient-to-r from-teal-500 to-cyan-500
          hover:from-teal-600 hover:to-cyan-600 text-white rounded-lg font-semibold mb-4 shadow-lg
          disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {rendered
            ? `Download All ${items.length} QR Labels`
            : 'Generating labels...'}
        </button>

        {/* QR Label Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  #{item.id}
                </span>
                <button
                  onClick={() => handleDownloadSingle(index)}
                  disabled={!rendered}
                  className="text-xs px-2 py-1 bg-teal-500 hover:bg-teal-600 text-white rounded
                  disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Download
                </button>
              </div>
              <canvas
                ref={(el) => (canvasRefs.current[index] = el)}
                className="w-full h-auto"
              />
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-sm">
          <p className="text-gray-700 dark:text-gray-300 mb-2 font-semibold">
            Printen:
          </p>
          <ol className="text-gray-600 dark:text-gray-400 space-y-1 text-xs ml-4 list-decimal">
            <li>Download all PNGs</li>
            <li>Open Brother iPrint&Label app</li>
            <li>Print op 62mm label (DK-22205)</li>
          </ol>
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
