import { useParams, useLocation } from 'react-router';
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { getById } from '../../api';
import AsyncData from '../../components/AsyncData';
import {
  FaSeedling,
  FaCalendar,
  FaDna,
  FaExclamationTriangle,
  FaFlask,
  FaCheckCircle,
  FaTimesCircle,
  FaBoxes,
} from 'react-icons/fa';
import { Link } from 'react-router';
import QRCodeDisplay from '../../components/qrcode/QRCodeDisplay';
import QRPrintModal from '../../components/qrcode/QRPrintModal';

const GrainSpawnDetail = () => {
  const { id } = useParams();
  const location = useLocation(); // Used to detect print prompt after creation
  const [showPrintModal, setShowPrintModal] = useState(false); // Print modal state

  const {
    data: grainSpawn,
    error,
    isLoading,
  } = useSWR(`grain-spawns/${id}`, getById);

  // Check if we navigated here from create flow and should show print prompt
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

  const qrData = `grainspawn:${id}`; // QR payload format

  return (
    <div
      className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 
    to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 p-6"
    >
      <div className="max-w-4xl mx-auto">
        <div className="content-card">
          <AsyncData error={error} loading={isLoading}>
            {grainSpawn && (
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div
                    className="icon-badge bg-linear-to-br from-amber-400 to-orange-500 
                  dark:from-amber-500 dark:to-orange-600 "
                  >
                    <FaSeedling className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1
                      className="text-4xl font-bold bg-linear-to-r from-amber-600 
                    to-orange-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent"
                    >
                      Grain Spawn #{grainSpawn.id}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      {grainSpawn.species?.name}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {/* Species */}
                  <div
                    className="p-6 rounded-xl bg-linear-to-br from-amber-50 to-orange-50 
                  dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200/50 dark:border-amber-700/50"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <FaDna className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                      <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                        Species
                      </p>
                    </div>
                    <p className="text-gray-800 dark:text-gray-200 font-semibold text-xl">
                      {grainSpawn.species?.name || 'Unknown'}
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
                      {formatDate(grainSpawn.inoculationDate)}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {/* Shaken Status */}
                  <div
                    className={`p-6 rounded-xl border ${
                      grainSpawn.shaken
                        ? 'bg-green-50 dark:bg-green-900/20 border-green-200/50 dark:border-green-700/50'
                        : 'bg-gray-50 dark:bg-gray-900/20 border-gray-200/50 dark:border-gray-700/50'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      {grainSpawn.shaken ? (
                        <FaCheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                      ) : (
                        <FaTimesCircle className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      )}
                      <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                        Shaken
                      </p>
                    </div>
                    <p className="text-gray-800 dark:text-gray-200 font-semibold text-xl">
                      {grainSpawn.shaken ? '✅ Yes' : '❌ No'}
                    </p>
                  </div>

                  {/* Contamination Status */}
                  <div
                    className={`p-6 rounded-xl border ${
                      grainSpawn.contaminationStatus === true
                        ? 'bg-red-50 dark:bg-red-900/20 border-red-200/50 dark:border-red-700/50'
                        : grainSpawn.contaminationStatus === false
                          ? 'bg-green-50 dark:bg-green-900/20 border-green-200/50 dark:border-green-700/50'
                          : 'bg-gray-50 dark:bg-gray-900/20 border-gray-200/50 dark:border-gray-700/50'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <FaExclamationTriangle
                        className={`w-5 h-5 ${
                          grainSpawn.contaminationStatus === true
                            ? 'text-red-600 dark:text-red-400'
                            : grainSpawn.contaminationStatus === false
                              ? 'text-green-600 dark:text-green-400'
                              : 'text-gray-600 dark:text-gray-400'
                        }`}
                      />
                      <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                        Contamination
                      </p>
                    </div>
                    <p className="text-gray-800 dark:text-gray-200 font-semibold text-xl">
                      {grainSpawn.contaminationStatus === true
                        ? '❌ Contaminated'
                        : grainSpawn.contaminationStatus === false
                          ? '✅ Clean'
                          : '❓ Unknown'}
                    </p>
                  </div>
                </div>

                {/* Source (Mother Culture or Liquid Culture) */}
                <div
                  className="p-6 rounded-xl bg-purple-50 dark:bg-purple-900/20 border 
                border-purple-200/50 dark:border-purple-700/50 mb-6"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <FaFlask className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                      Source
                    </p>
                  </div>
                  {grainSpawn.motherCulture ? (
                    <Link
                      to={`/mother-cultures/${grainSpawn.motherCulture.id}`}
                      className="text-purple-600 dark:text-purple-400 hover:text-purple-800 
                      dark:hover:text-purple-300 font-semibold text-lg underline"
                    >
                      Mother Culture: {grainSpawn.motherCulture.name}
                    </Link>
                  ) : grainSpawn.liquidCulture ? (
                    <Link
                      to={`/liquid-cultures/${grainSpawn.liquidCulture.id}`}
                      className="text-purple-600 dark:text-purple-400 hover:text-purple-800 
                      dark:hover:text-purple-300 font-semibold text-lg underline"
                    >
                      Liquid Culture: {grainSpawn.liquidCulture.name}
                    </Link>
                  ) : (
                    <p className="text-gray-800 dark:text-gray-200 font-semibold text-lg">
                      Unknown
                    </p>
                  )}
                </div>

                {/* Characteristics */}
                {grainSpawn.characteristic && (
                  <div
                    className="p-6 rounded-xl bg-white/50 dark:bg-gray-900/50 border 
                  border-gray-200/50 dark:border-gray-700/50 mb-6"
                  >
                    <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2">
                      Characteristics
                    </p>
                    <p className="text-gray-800 dark:text-gray-200 text-lg">
                      {grainSpawn.characteristic}
                    </p>
                  </div>
                )}

                {/* Substrates produced from this Grain Spawn */}
                {grainSpawn.substrates && grainSpawn.substrates.length > 0 && (
                  <div
                    className="p-6 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border 
                  border-indigo-200/50 dark:border-indigo-700/50 mb-6"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <FaBoxes className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                        Substrates from this Grain Spawn
                      </h2>
                    </div>
                    <div className="space-y-2">
                      {grainSpawn.substrates.map((substrate) => (
                        <Link
                          key={substrate.id}
                          to={`/substrates/${substrate.id}`}
                          className="block p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg 
                          hover:bg-white/80 dark:hover:bg-gray-800/80 transition-colors"
                        >
                          <p className="text-gray-700 dark:text-gray-300">
                            Substrate #{substrate.id} – Inoculated:{' '}
                            {formatDate(substrate.inoculationDate)}
                            {substrate.contaminationStatus === true && ' ❌'}
                            {substrate.contaminationStatus === false && ' ✅'}
                          </p>
                        </Link>
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
                    Scan this QR code to quickly return to this grain spawn
                  </p>
                </div>
              </div>
            )}
          </AsyncData>
        </div>

        {/* Print modal (outside AsyncData but inside container) */}
        {showPrintModal && (
          <QRPrintModal
            data={`grainspawn:${id}`}
            title={grainSpawn?.species?.name || 'Unknown Species'}
            date={`Inoculated: ${new Date(grainSpawn?.inoculationDate).toLocaleDateString('nl-BE')}`}
            onClose={() => setShowPrintModal(false)}
            onPrint={() => setShowPrintModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default GrainSpawnDetail;
