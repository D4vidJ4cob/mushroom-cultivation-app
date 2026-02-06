import { useParams, useLocation } from 'react-router';
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { getById } from '../../api';
import AsyncData from '../../components/AsyncData';
import {
  FaFlask,
  FaCalendar,
  FaDna,
  FaSeedling,
  FaExclamationTriangle,
} from 'react-icons/fa';
import QRCodeDisplay from '../../components/qrcode/QRCodeDisplay';
import QRPrintModal from '../../components/qrcode/QRPrintModal';

const LiquidCultureDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const [showPrintModal, setShowPrintModal] = useState(false);

  const {
    data: liquidCulture,
    error,
    isLoading,
  } = useSWR(`liquid-cultures/${id}`, getById);

  // Check if we should show print prompt
  useEffect(() => {
    if (location.state?.showPrintPrompt) {
      setShowPrintModal(true);
      // Clear history state so refresh does not reopen the modal
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('nl-BE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const qrData = `liquidculture:${id}`;

  return (
    <div
      className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 
    to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 p-6"
    >
      <div className="max-w-4xl mx-auto">
        <div className="content-card">
          <AsyncData error={error} loading={isLoading}>
            {liquidCulture && (
              <div>
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div
                    className="p-3 bg-linear-to-br from-cyan-400 to-blue-500 
                  dark:from-cyan-500 dark:to-blue-600 rounded-2xl shadow-lg"
                  >
                    <FaFlask className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1
                      className="text-4xl font-bold bg-linear-to-r from-cyan-600 
                    to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent"
                    >
                      {liquidCulture.name}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      Liquid Culture #{liquidCulture.id}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {/* Species */}
                  <div
                    className="p-6 rounded-xl bg-linear-to-br from-cyan-50 to-blue-50 
                  dark:from-cyan-900/20 dark:to-blue-900/20 border border-cyan-200/50 dark:border-cyan-700/50"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <FaDna className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                      <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                        Species
                      </p>
                    </div>
                    <p className="text-gray-800 dark:text-gray-200 font-semibold text-xl">
                      {liquidCulture.species?.name || 'Unknown'}
                    </p>
                  </div>

                  {/* Inoculation Date */}
                  <div
                    className="p-6 rounded-xl bg-linear-to-br from-blue-50 to-indigo-50 
                  dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200/50 dark:border-blue-700/50"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <FaCalendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                        Inoculation Date
                      </p>
                    </div>
                    <p className="text-gray-800 dark:text-gray-200 font-semibold text-xl">
                      {formatDate(liquidCulture.inoculationDate)}
                    </p>
                  </div>
                </div>

                {/* Contamination Status */}
                <div
                  className={`p-6 rounded-xl border mb-6 ${
                    liquidCulture.contaminationStatus === true
                      ? 'bg-red-50 dark:bg-red-900/20 border-red-200/50 dark:border-red-700/50'
                      : liquidCulture.contaminationStatus === false
                        ? 'bg-green-50 dark:bg-green-900/20 border-green-200/50 dark:border-green-700/50'
                        : 'bg-gray-50 dark:bg-gray-900/20 border-gray-200/50 dark:border-gray-700/50'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <FaExclamationTriangle
                      className={`w-5 h-5 ${
                        liquidCulture.contaminationStatus === true
                          ? 'text-red-600 dark:text-red-400'
                          : liquidCulture.contaminationStatus === false
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-gray-600 dark:text-gray-400'
                      }`}
                    />
                    <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                      Contamination Status
                    </p>
                  </div>
                  <p className="text-gray-800 dark:text-gray-200 font-semibold text-xl">
                    {liquidCulture.contaminationStatus === true
                      ? '❌ Contaminated'
                      : liquidCulture.contaminationStatus === false
                        ? '✅ Clean'
                        : '❓ Unknown'}
                  </p>
                </div>

                {/* Characteristic */}
                {liquidCulture.characteristic && (
                  <div
                    className="p-6 rounded-xl bg-white/50 dark:bg-gray-900/50 border 
                  border-gray-200/50 dark:border-gray-700/50 mb-6"
                  >
                    <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2">
                      Characteristics
                    </p>
                    <p className="text-gray-800 dark:text-gray-200 text-lg">
                      {liquidCulture.characteristic}
                    </p>
                  </div>
                )}

                {/* Grain Spawns produced from this Liquid Culture */}
                {liquidCulture.grainSpawns &&
                  liquidCulture.grainSpawns.length > 0 && (
                  <div
                    className="p-6 rounded-xl bg-amber-50 dark:bg-amber-900/20 border 
                  border-amber-200/50 dark:border-amber-700/50 mb-6"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <FaSeedling className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                        Grain Spawns from this Culture
                      </h2>
                    </div>
                    <div className="space-y-2">
                      {liquidCulture.grainSpawns.map((gs) => (
                        <div
                          key={gs.id}
                          className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg"
                        >
                          <p className="text-gray-700 dark:text-gray-300">
                            Grain Spawn #{gs.id} - Inoculated:{' '}
                            {formatDate(gs.inoculationDate)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* QR Code Section */}
                <div
                  className="p-6 rounded-xl bg-white/50 dark:bg-gray-900/50 border 
                border-gray-200/50 dark:border-gray-700/50"
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
                    Scan this QR code to quickly return to this liquid culture
                  </p>
                </div>
              </div>
            )}
          </AsyncData>
        </div>

        {/* Print Modal */}
        {showPrintModal && liquidCulture && (
          <QRPrintModal
            data={`liquidculture:${id}`}
            title={liquidCulture?.name}
            date={`Inoculated: ${new Date(liquidCulture?.inoculationDate).toLocaleDateString('nl-BE')}`}
            onClose={() => setShowPrintModal(false)}
            onPrint={() => setShowPrintModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default LiquidCultureDetail;
