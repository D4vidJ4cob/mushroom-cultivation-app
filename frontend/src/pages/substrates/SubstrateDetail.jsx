import { useParams, useLocation } from 'react-router';
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { getById } from '../../api';
import AsyncData from '../../components/AsyncData';
import {
  FaBoxes,
  FaCalendar,
  FaSeedling,
  FaExclamationTriangle,
  FaUser,
  FaUsers,
} from 'react-icons/fa';
import { Link } from 'react-router';
import QRCodeDisplay from '../../components/qrcode/QRCodeDisplay';
import QRPrintModal from '../../components/qrcode/QRPrintModal';

const SubstrateDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const [showPrintModal, setShowPrintModal] = useState(false);

  const {
    data: substrate,
    error,
    isLoading,
  } = useSWR(`substrates/${id}`, getById);

  // Check if we should show print prompt
  useEffect(() => {
    if (location.state?.showPrintPrompt) {
      setShowPrintModal(true);
      // Clear history state so refresh does not reopen the modal
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString('nl-BE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const qrData = `substrate:${id}`;

  return (
    <div
      className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 
    to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 p-6"
    >
      <div className="max-w-4xl mx-auto">
        <div className="content-card">
          <AsyncData error={error} loading={isLoading}>
            {substrate && (
              <div>
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div
                    className="p-3 bg-linear-to-br from-indigo-400 to-purple-500 
                  dark:from-indigo-500 dark:to-purple-600 rounded-2xl shadow-lg"
                  >
                    <FaBoxes className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1
                      className="text-4xl font-bold bg-linear-to-r from-indigo-600 
                    to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent"
                    >
                      Substrate #{substrate.id}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      {substrate.grainSpawn?.species?.name || 'Unknown Species'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
                      {formatDate(substrate.inoculationDate)}
                    </p>
                  </div>

                  {/* Incubation Date */}
                  <div
                    className="p-6 rounded-xl bg-linear-to-br from-purple-50 to-pink-50 
                  dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200/50 dark:border-purple-700/50"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <FaCalendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                        Incubation Date
                      </p>
                    </div>
                    <p className="text-gray-800 dark:text-gray-200 font-semibold text-xl">
                      {formatDate(substrate.incubationDate)}
                    </p>
                  </div>
                </div>

                {/* Contamination Status */}
                <div
                  className={`p-6 rounded-xl border mb-6 ${
                    substrate.contaminationStatus === true
                      ? 'bg-red-50 dark:bg-red-900/20 border-red-200/50 dark:border-red-700/50'
                      : substrate.contaminationStatus === false
                        ? 'bg-green-50 dark:bg-green-900/20 border-green-200/50 dark:border-green-700/50'
                        : 'bg-gray-50 dark:bg-gray-900/20 border-gray-200/50 dark:border-gray-700/50'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <FaExclamationTriangle
                      className={`w-5 h-5 ${
                        substrate.contaminationStatus === true
                          ? 'text-red-600 dark:text-red-400'
                          : substrate.contaminationStatus === false
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-gray-600 dark:text-gray-400'
                      }`}
                    />
                    <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                      Contamination Status
                    </p>
                  </div>
                  <p className="text-gray-800 dark:text-gray-200 font-semibold text-xl">
                    {substrate.contaminationStatus === true
                      ? '❌ Contaminated'
                      : substrate.contaminationStatus === false
                        ? '✅ Clean'
                        : '❓ Unknown'}
                  </p>
                </div>

                {/* Grain Spawn Source */}
                <div
                  className="p-6 rounded-xl bg-amber-50 dark:bg-amber-900/20 border 
                border-amber-200/50 dark:border-amber-700/50 mb-6"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <FaSeedling className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                      Source Grain Spawn
                    </p>
                  </div>
                  {substrate.grainSpawn ? (
                    <Link
                      to={`/grain-spawns/${substrate.grainSpawn.id}`}
                      className="text-amber-600 dark:text-amber-400 hover:text-amber-800 
                      dark:hover:text-amber-300 font-semibold text-lg underline"
                    >
                      Grain Spawn #{substrate.grainSpawn.id} (
                      {substrate.grainSpawn.species?.name})
                    </Link>
                  ) : (
                    <p className="text-gray-800 dark:text-gray-200 font-semibold text-lg">
                      Unknown
                    </p>
                  )}
                </div>

                {/* Created By */}
                {substrate.userId && (
                  <div
                    className="p-6 rounded-xl bg-teal-50 dark:bg-teal-900/20 border 
                  border-teal-200/50 dark:border-teal-700/50 mb-6"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <FaUser className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                      <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                        Created By
                      </p>
                    </div>
                    <p className="text-gray-800 dark:text-gray-200 font-semibold text-lg">
                      User #{substrate.userId}
                    </p>
                  </div>
                )}

                {/* Batch Assignments */}
                {substrate.assignments && substrate.assignments.length > 0 && (
                  <div
                    className="p-6 rounded-xl bg-cyan-50 dark:bg-cyan-900/20 border 
                  border-cyan-200/50 dark:border-cyan-700/50 mb-6"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <FaUsers className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                        Assigned Workers
                      </h2>
                    </div>
                    <div className="space-y-2">
                      {substrate.assignments.map((assignment) => (
                        <div
                          key={assignment.id}
                          className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg 
                        flex justify-between items-center"
                        >
                          <p className="text-gray-700 dark:text-gray-300">
                            {assignment.user?.name ||
                              `User #${assignment.userId}`}
                          </p>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              assignment.role === 'manager'
                                ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400'
                                : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
                            }`}
                          >
                            {assignment.role}
                          </span>
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
                    Scan this QR code to quickly return to this substrate
                  </p>
                </div>
              </div>
            )}
          </AsyncData>
        </div>

        {/* Print Modal */}
        {showPrintModal && (
          <QRPrintModal
            data={qrData}
            title={`Substrate #${id}`}
            onClose={() => setShowPrintModal(false)}
            onPrint={() => setShowPrintModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default SubstrateDetail;
