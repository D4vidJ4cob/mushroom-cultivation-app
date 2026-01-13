import QRCodeDisplay from './QRCodeDisplay';

export default function QRPrintModal({ data, title, onClose, onPrint }) {
  
  const handlePrint = () => {
    window.print();
    onPrint();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Do you want to print the QR code?
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-2xl"
          >
            ✕
          </button>
        </div>

        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Print the QR code for <span className="font-semibold">{title}</span> now?
        </p>
        
        <div className="qr-print-area mb-6">
          <QRCodeDisplay data={data} size={250} />
        </div>

        <div className="flex gap-3">
          <button
            onClick={handlePrint}
            className="flex-1 px-6 py-3 rounded-xl font-semibold
            bg-linear-to-r from-teal-500 to-cyan-500 
            hover:from-teal-600 hover:to-cyan-600
            text-white shadow-md hover:shadow-lg
            transform hover:scale-105 active:scale-95
            transition-all duration-300"
          >
            📷 Print Now
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 rounded-xl font-semibold
            bg-gray-200 dark:bg-gray-700
            hover:bg-gray-300 dark:hover:bg-gray-600
            text-gray-700 dark:text-gray-300
            shadow-md hover:shadow-lg
            transform hover:scale-105 active:scale-95
            transition-all duration-300"
          >
            Later
          </button>
        </div>
      </div>
    </div>
  );
}