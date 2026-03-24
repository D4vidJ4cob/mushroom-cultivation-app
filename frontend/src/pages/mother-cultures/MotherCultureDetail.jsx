import { useParams, useLocation, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { getById, deleteById } from '../../api';
import AsyncData from '../../components/AsyncData';
import { FaCalendar, FaDna, FaSeedling, FaTrash } from 'react-icons/fa';
import QRCodeDisplay from '../../components/qrcode/QRCodeDisplay';
import QRPrintModal from '../../components/qrcode/QRPrintModal';

const MotherCultureDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [showPrintModal, setShowPrintModal] = useState(false);

  const {
    data: motherCulture,
    error,
    isLoading,
  } = useSWR(`mother-cultures/${id}`, getById);

  const { trigger: deleteMotherCulture } = useSWRMutation(
    'mother-cultures',
    deleteById,
  );

  const handleDelete = async () => {
    await deleteMotherCulture(id);
    navigate('/mother-cultures');
  };

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

  const qrData = `motherculture:${id}`; // 👈 FIX: was "liquidculture"

  return (
    <div
      className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 
    to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 p-6"
    >
      <div className="max-w-4xl mx-auto">
        <div className="content-card">
          <AsyncData error={error} loading={isLoading}>
            {motherCulture && (
              <div>
                <div className="flex items-center justify-between gap-4 mb-8">
                  <div className="flex items-center gap-4">
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
                        Liquid Culture #{motherCulture.id}
                      </h1>
                    </div>
                  </div>
                  <button
                    onClick={handleDelete}
                    className="group/btn p-3 bg-linear-to-br from-red-400 to-rose-500
                                  hover:from-red-500 hover:to-rose-600
                                  dark:from-red-500 dark:to-rose-600 dark:hover:from-red-400 dark:hover:to-rose-500
                                  text-white rounded-xl shadow-md hover:shadow-lg
                                  transform hover:scale-110 active:scale-95 transition-all duration-300
                                  relative overflow-hidden"
                    aria-label="Delete"
                  >
                    <span
                      className="absolute inset-0 bg-white/20 scale-0 group-hover/btn:scale-100
                                  transition-transform duration-300 rounded-xl"
                    ></span>
                    <FaTrash className="w-4 h-4 relative z-10" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {/* Species */}
                  <div
                    className="p-6 rounded-xl bg-linear-to-br from-teal-50 to-cyan-50 
                  dark:from-teal-900/20 dark:to-cyan-900/20 border border-teal-200/50 dark:border-teal-700/50"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <FaDna className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                      <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                        Species
                      </p>
                    </div>
                    <p className="text-gray-800 dark:text-gray-200 font-semibold text-xl">
                      {motherCulture.species?.name || 'Unknown'}
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
                      {formatDate(motherCulture.inoculationDate)}
                    </p>
                  </div>
                </div>

                {/* Characteristic */}
                {motherCulture.characteristic && (
                  <div
                    className="p-6 rounded-xl bg-white/50 dark:bg-gray-900/50 border 
                  border-gray-200/50 dark:border-gray-700/50 mb-6"
                  >
                    <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2">
                      Characteristics
                    </p>
                    <p className="text-gray-800 dark:text-gray-200 text-lg">
                      {motherCulture.characteristic}
                    </p>
                  </div>
                )}

                {/* Grain Spawns produced from this Mother Culture */}
                {motherCulture.grainSpawns &&
                  motherCulture.grainSpawns.length > 0 && (
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
                      {motherCulture.grainSpawns.map((gs) => (
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
                    Scan this QR code to quickly return to this mother culture
                  </p>
                </div>
              </div>
            )}
          </AsyncData>
        </div>

        {/* Print Modal */}
        {showPrintModal && motherCulture && (
          <QRPrintModal
            data={`motherculture:${id}`}
            title={motherCulture?.name}
            date={`Inoculated: ${new Date(motherCulture?.inoculationDate).toLocaleDateString('nl-BE')}`}
            onClose={() => setShowPrintModal(false)}
            onPrint={() => setShowPrintModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default MotherCultureDetail;
