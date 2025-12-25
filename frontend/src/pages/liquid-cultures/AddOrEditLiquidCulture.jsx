import useSWR from 'swr';
import { getAll, getById, save } from '../../api';
import useSWRMutation from 'swr/mutation';
import { useParams } from 'react-router';
import AsyncData from '../../components/AsyncData';
import LiquidCultureForm from '../../components/liquid-cultures/LiquidCultureForm';
import { FaFlask } from 'react-icons/fa';

export default function AddOrEditLiquidCulture() {
  const { id } = useParams();
  const isEditing = Boolean(id);

  const {data: liquidCulture, error: liquidCultureError, isLoading: liquidCultureLoading} = useSWR(
    isEditing ? `liquid-cultures/${id}` : null,
    () => getById(`liquid-cultures/${id}`),
  );

  const {data: species, error: speciesError, isLoading: speciesLoading} = useSWR(
    'species',
    () => getAll('species'),
  );

  const {trigger: saveLiquidCulture, error: saveError} = useSWRMutation('liquid-cultures', save);

  return(
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 
    dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 p-6">
      
      {/* Header */}
      <div className="max-w-3xl mx-auto mb-8">
        <div className="flex items-center gap-4 mb-2">
          <div className="icon-badge bg-linear-to-br from-teal-400 to-cyan-500 dark:from-teal-500 
          dark:to-cyan-600">
            <FaFlask className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-linear-to-r from-teal-600 to-cyan-600 
          dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
            {isEditing ? 'Edit Liquid Culture' : 'Add Liquid Culture'}
          </h1>
        </div>
      </div>

      {/* Form card */}
      <div className="max-w-3xl mx-auto">
        <div className="content-card">
          <AsyncData error={liquidCultureError || speciesError || saveError} 
            loading={liquidCultureLoading || speciesLoading}>
            <LiquidCultureForm 
              liquidCulture={liquidCulture} 
              species={species}
              saveLiquidCulture={saveLiquidCulture} 
              isEditing={isEditing}
            />
          </AsyncData>
        </div>
      </div>
    </div>
  );
}