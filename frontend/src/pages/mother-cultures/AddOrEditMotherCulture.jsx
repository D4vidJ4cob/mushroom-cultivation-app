import useSWR from 'swr';
import { getAll, getById, save } from '../../api';
import useSWRMutation from 'swr/mutation';
import { useNavigate, useParams } from 'react-router';
import AsyncData from '../../components/AsyncData';
import MotherCultureForm from '../../components/mother-cultures/MotherCultureForm';
import { FaFlask } from 'react-icons/fa';

export default function AddOrEditMotherCulture() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const {
    data: motherCulture,
    error: motherCultureError,
    isLoading: motherCultureLoading,
  } = useSWR(isEditing ? `mother-cultures/${id}` : null, () =>
    getById(`mother-cultures/${id}`),
  );

  const {
    data: species,
    error: speciesError,
    isLoading: speciesLoading,
  } = useSWR('species', () => getAll('species'));

  const { trigger: saveMotherCulture, error: saveError } = useSWRMutation(
    'mother-cultures',
    save,
  );

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
            {isEditing ? 'Edit Mother Culture' : 'Add Mother Culture'}
          </h1>
        </div>
      </div>

      {/* Form card */}
      <div className="max-w-3xl mx-auto">
        <div className="content-card">
          <AsyncData
            error={motherCultureError || speciesError || saveError}
            loading={motherCultureLoading || speciesLoading}
          >
            <MotherCultureForm
              motherCulture={motherCulture}
              species={species}
              saveMotherCulture={saveMotherCulture}
              isEditing={isEditing}
              navigate={navigate}
            />
          </AsyncData>
        </div>
      </div>
    </div>
  );
}
