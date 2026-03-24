// src/pages/species/SpeciesDetail.jsx
import { useParams, useLocation, useNavigate } from 'react-router';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { getById, deleteById } from '../../api';
import AsyncData from '../../components/AsyncData';
import { FaDna, FaTrash } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import QRCodeDisplay from '../../components/qrcode/QRCodeDisplay';
import QRPrintModal from '../../components/qrcode/QRPrintModal';

const SpeciesDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
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

  const { trigger: deleteSpecies } = useSWRMutation('species', deleteById);

  const handleDelete = async () => {
    await deleteSpecies(id);
    navigate('/species');
  };

  return (
    <div
      className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50
    to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 p-6"
    >
      <div className="max-w-4xl mx-auto">
        <div className="content-card">
          <AsyncData error={error} loading={isLoading}>
            {species && (
              <div>
                <div className="flex items-center justify-between gap-4 mb-8">
                  <div className="flex items-center gap-4">
                    <div
                      className="icon-badge bg-linear-to-br from-teal-400 to-cyan-500
                    dark:from-teal-500 dark:to-cyan-600"
                    >
                      <FaDna className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h1
                        className="text-4xl font-bold bg-linear-to-r from-teal-600
                      to-cyan-600 dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent"
                      >
                        {species.name}
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
