import { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

export default function QRCodeDisplay({ data, size = 200 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current && data) {
      QRCode.toCanvas(canvasRef.current, data, {
        width: size,
        margin: 2,
      });
    }
  }, [data, size]);

  return (
    <div className='flex flex-col items-center gap-4'>
      <canvas ref={canvasRef}/>
      <p className="text-sm text-gray-600 dark:text-gray-400">{data}</p>
    </div>
  );
}