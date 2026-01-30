// src/pages/species/SpeciesDetail.jsx
import { useLocation, useParams } from 'react-router';
import useSWR from 'swr';
import { getById } from '../../api';
import AsyncData from '../../components/AsyncData';
import { FaDna } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import QRCodeDisplay from '../../components/qrcode/QRCodeDisplay';
import QRPrintModal from '../../components/qrcode/QRPrintModal';

const SpeciesDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const [showPrintModal, setShowPrintModal] = useState(false);

  const { data: species, error, isLoading } = useSWR(`species/${id}`, getById);

  useEffect(() => {
    if (location.state?.showPrintPrompt) {
      setShowPrintModal(true);
      // Clear history state so refresh does not reopen the modal
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const qrData = `species:${id}`; // QR payload format

  return (
    <div
      className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 
    to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 p-6 
    flex items-center justify-center"
    >
      <div className="w-full max-w-md">
        <div className="content-card">
          <AsyncData error={error} loading={isLoading}>
            {species && (
              <div>
                {/* Icon */}
                <div
                  className="inline-flex items-center justify-center w-24 h-24 rounded-full 
                bg-linear-to-br from-teal-400 to-cyan-500 dark:from-teal-500 dark:to-cyan-600 
                mb-8 shadow-2xl"
                >
                  <FaDna className="w-12 h-12 text-white" />
                </div>

                {/* Species Name */}
                <h1
                  className="text-5xl font-bold bg-linear-to-r from-teal-600 
                to-cyan-600 dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent mb-6 
                leading-tight"
                >
                  {species.name}
                </h1>

                {/* ID Badge */}
                <div
                  className="inline-flex items-center px-6 py-3 rounded-full 
                bg-gray-100 dark:bg-gray-700"
                >
                  <span className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                    Species ID:{' '}
                    <span className="font-bold text-gray-800 dark:text-gray-200">
                      #{species.id}
                    </span>
                  </span>
                </div>

                {/* QR Code Section */}
                <div
                  className="p-6 rounded-xl bg-white/50 dark:bg-gray-900/50 border 
                border-gray-200/50 dark:border-gray-700/50 mt-6"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      QR Code
                    </h3>
                    <button
                      onClick={() => setShowPrintModal(true)}
                      className="px-4 py-2 rounded-xl font-semibold
                      bg-linear-to-r from-teal-500 to-cyan-500 
                      hover:from-teal-600 hover:to-cyan-600
                      text-white shadow-md hover:shadow-lg
                      transform hover:scale-105 active:scale-95
                      transition-all duration-300"
                    >
                      🖨️ Print QR Code
                    </button>
                  </div>

                  <div className="flex justify-center">
                    <QRCodeDisplay data={qrData} size={250} />
                  </div>

                  <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
                    Scan this QR code to quickly return to this species
                  </p>
                </div>
              </div>
            )}
          </AsyncData>
        </div>

        {/* Print modal (outside AsyncData but inside container) */}
        {showPrintModal && species && (
          <QRPrintModal
            data={`species:${id}`}
            title={species?.name}
            date={null} // species has no date
            onClose={() => setShowPrintModal(false)}
            onPrint={() => setShowPrintModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default SpeciesDetail;
