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
          <h1 className="text-5xl font-bold bg-linear-to-r from-teal-600 to-cyan-600 
          dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
            Species
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400 ml-20 text-lg">
          Manage your mushroom species collection
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 rounded-3xl shadow-2xl border 
        border-white/20 dark:border-gray-700/30 p-8">
          
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