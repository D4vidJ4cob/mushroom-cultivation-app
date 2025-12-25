import { useState } from 'react';
import SearchBar from '../../components/SearchBar';
import AsyncData from '../../components/AsyncData';
import { getAll, deleteById } from '../../api';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import SubstratesTable from '../../components/substrates/SubstrateTable';
import { FaFlask } from 'react-icons/fa';

export default function SubstratesList() {

  const [search, setSearch] = useState('');

  const {data:substrates=[], error, isLoading} = useSWR('substrates', getAll);

  const { trigger: deleteSubstrate, error: deleteError } = useSWRMutation(
    'substrates',
    deleteById,
  );

  const filteredSubstrates = substrates.filter((substrate) => 
    substrate.grainSpawn.species.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="page-container">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center gap-4 mb-2">
          <div className="icon-badge bg-linear-to-br from-teal-400 to-cyan-500 dark:from-teal-500 
          dark:to-cyan-600">
            <FaFlask className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-linear-to-r from-teal-600 to-cyan-600 
          dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
            Substrates
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400 ml-20 text-lg">
          Manage your substrate collection
        </p>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto">
        <div className="content-card">
          
          <div className="mb-8">
            <SearchBar
              searchTerm={search}
              onSearchChange={setSearch}
              addLink="/substrates/add"
              addButtonText="Add Substrate" 
            />
          </div>
          
          <AsyncData error={error || deleteError} loading={isLoading}>
            <SubstratesTable
              substrateData={filteredSubstrates}
              onDelete={deleteSubstrate}
            />
          </AsyncData>
        </div>
      </div>
    </div>
  );
}