import useSWR from 'swr';
import { getAll, getById, save } from '../../api';
import useSWRMutation from 'swr/mutation';
import AsyncData from '../../components/AsyncData';
import { useParams } from 'react-router';
import SubstrateForm from '../../components/substrates/SubstrateForm';
import { FaFlask } from 'react-icons/fa';

export default function AddOrEditSubstrate() {
  const { id } = useParams();
  const isEditing = Boolean(id);

  const {data: substrate, error: substrateError, isLoading: substrateLoading} = useSWR(
    isEditing ? `substrates/${id}` : null,
    () => getById(`substrates/${id}`),
  );

  const {data: grainSpawns, error: grainSpawnsError, isLoading: grainSpawnsLoading} = useSWR(
    'grain-spawns', () => getAll('grain-spawns'),
  );

  const {trigger: saveSubstrate, error: saveError} = useSWRMutation('substrates', save);

  return(
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 
    dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 p-6">
      
      {/* Header */}
      <div className="max-w-3xl mx-auto mb-8">
        <div className="flex items-center gap-4 mb-2">
          <div className="p-3 bg-gradient-to-br from-teal-400 to-cyan-500 dark:from-teal-500 
          dark:to-cyan-600 rounded-2xl shadow-lg">
            <FaFlask className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 
          dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
            {isEditing ? 'Edit Substrate' : 'Add Substrate'}
          </h1>
        </div>
      </div>

      {/* Form card */}
      <div className="max-w-3xl mx-auto">
        <div className="backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 rounded-3xl shadow-2xl border 
        border-white/20 dark:border-gray-700/30 p-8">
          <AsyncData error={substrateError || grainSpawnsError || saveError} 
            loading={substrateLoading || grainSpawnsLoading}>
            <SubstrateForm 
              substrate={substrate} 
              grainSpawns={grainSpawns}
              saveSubstrate={saveSubstrate} 
              isEditing={isEditing}
            />
          </AsyncData>
        </div>
      </div>
    </div>
  );
}