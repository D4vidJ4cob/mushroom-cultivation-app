import { useState } from 'react';
import useSWR from 'swr';
import { getAll, getById, save, post } from '../../api';
import useSWRMutation from 'swr/mutation';
import { useNavigate, useParams } from 'react-router';
import AsyncData from '../../components/AsyncData';
import SubstrateForm from '../../components/substrates/SubstrateForm';
import BatchQRPrintModal from '../../components/qrcode/BatchQRPrintModal';
import { FaFlask } from 'react-icons/fa';

export default function AddOrEditSubstrate() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const [batchItems, setBatchItems] = useState(null);

  const {
    data: substrate,
    error: substrateError,
    isLoading: substrateLoading,
  } = useSWR(isEditing ? `substrates/${id}` : null, () =>
    getById(`substrates/${id}`),
  );

  const {
    data: grainSpawns,
    error: grainSpawnsError,
    isLoading: grainSpawnsLoading,
  } = useSWR('grain-spawns', () => getAll('grain-spawns'));

  const { trigger: saveSubstrate, error: saveError } = useSWRMutation(
    'substrates',
    save,
  );

  const { trigger: bulkCreateSubstrate, error: bulkError } = useSWRMutation(
    'substrates/bulk',
    post,
  );

  const handleBatchCreated = (items) => {
    setBatchItems(items);
  };

  const handleBatchModalClose = () => {
    setBatchItems(null);
    navigate('/substrates');
  };

  return (
    <div
      className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 
    dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 p-6"
    >
      {/* Header */}
      <div className="max-w-3xl mx-auto mb-8">
        <div className="flex items-center gap-4 mb-2">
          <div
            className="icon-badge bg-linear-to-br from-teal-400 to-cyan-500 dark:from-teal-500 
          dark:to-cyan-600"
          >
            <FaFlask className="w-8 h-8 text-white" />
          </div>
          <h1
            className="text-5xl font-bold bg-linear-to-r from-teal-600 to-cyan-600 
          dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent"
          >
            {isEditing ? 'Edit Substrate' : 'Add Substrate'}
          </h1>
        </div>
      </div>

      {/* Form card */}
      <div className="max-w-3xl mx-auto">
        <div className="content-card">
          <AsyncData
            error={substrateError || grainSpawnsError || saveError || bulkError}
            loading={substrateLoading || grainSpawnsLoading}
          >
            <SubstrateForm
              substrate={substrate}
              grainSpawns={grainSpawns}
              saveSubstrate={saveSubstrate}
              bulkCreateSubstrate={bulkCreateSubstrate}
              isEditing={isEditing}
              navigate={navigate}
              onBatchCreated={handleBatchCreated}
            />
          </AsyncData>
        </div>
      </div>

      {/* Batch QR Print Modal */}
      {batchItems && (
        <BatchQRPrintModal
          items={batchItems}
          type="substrate"
          titleFn={(item) =>
            item.grainSpawn?.motherCulture?.name ||
            item.grainSpawn?.liquidCulture?.name ||
            item.grainSpawn?.species?.name ||
            'Unknown'
          }
          dateFn={(item) =>
            `Inoculated: ${new Date(item.inoculationDate).toLocaleDateString('nl-BE')}`
          }
          onClose={handleBatchModalClose}
        />
      )}
    </div>
  );
}
