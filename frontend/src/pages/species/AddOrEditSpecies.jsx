import useSWR from 'swr';
import { getById, save } from '../../api';
import useSWRMutation from 'swr/mutation';
import AsyncData from '../../components/AsyncData';
import SpeciesForm from '../../components/species/SpeciesForm';
import { useNavigate, useParams } from 'react-router';

export default function AddOrEditSpecies() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);

  const {
    data: species,
    error: speciesError,
    isLoading: speciesLoading,
  } = useSWR(isEditing ? `species/${id}` : null, () =>
    getById(`species/${id}`),
  );

  const { trigger: saveSpecies, error: saveError } = useSWRMutation(
    'species',
    save,
  );

  return (
    <div className="w-full min-w-sm bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h1 className="text-4xl font-bold mb-6 text-gray-800 dark:text-white">
        {isEditing ? 'Edit species' : 'Add species'}
      </h1>
      <AsyncData error={speciesError || saveError} loading={speciesLoading}>
        <SpeciesForm
          species={species}
          saveSpecies={saveSpecies}
          isEditing={isEditing}
          navigate={navigate}
        />
      </AsyncData>
    </div>
  );
}
