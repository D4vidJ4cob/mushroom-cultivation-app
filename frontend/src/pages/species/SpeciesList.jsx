import { useState } from 'react';
import SearchBar from '../../components/SearchBar';
import SpeciesTable from '../../components/species/SpeciesTable';
import AsyncData from '../../components/AsyncData';
import { getAll, deleteById } from '../../api';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { FaFlask } from 'react-icons/fa';

export default function SpeciesList() {

  const [search, setSearch] = useState('');

  const {data:species=[], error, isLoading} = useSWR('species', getAll);

  const { trigger: deleteSpecies, error: deleteError } = useSWRMutation(
    'species',
    deleteById,
  );

  const filteredSpecies = species.filter((species) => 
    species.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="page-container">
      
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center gap-4 mb-2">
          <div className="icon-badge bg-linear-to-br from-teal-400 to-cyan-500 dark:from-teal-500 
          dark:to-cyan-600">
            <FaFlask className="w-8 h-8 text-white" />
          </div>
          <h1 className="page-header-title">
            Species
          </h1>
        </div>
        <p className="page-header-subtitle">
          Manage your mushroom species collection
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="content-card">
          
          <div className="mb-8">
            <SearchBar
              searchTerm={search}
              onSearchChange={setSearch}
              addLink="/species/add"
              addButtonText="Add Species"
            />
          </div>
          
          <AsyncData error={error || deleteError} loading={isLoading}>
            <SpeciesTable
              speciesData={filteredSpecies}
              onDelete={deleteSpecies}
            />
          </AsyncData>
        </div>
      </div>
    </div>
  );
}