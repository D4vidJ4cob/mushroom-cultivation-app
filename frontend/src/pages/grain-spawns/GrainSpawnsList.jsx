import { useState } from 'react';
import SearchBar from '../../components/SearchBar';
import GrainSpawnTable from '../../components/grain-spawns/GrainSpawnsTable';
import AsyncData from '../../components/AsyncData';
import { getAll, deleteById } from '../../api';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { FaFlask } from 'react-icons/fa';

export default function GrainSpawnsList() {

  const [search, setSearch] = useState('');

  const {data:grainSpawns=[], error, isLoading} = useSWR('grain-spawns', getAll);

  const { trigger: deleteGrainSpawn, error: deleteError } = useSWRMutation(
    'grain-spawns',
    deleteById,
  );

  const filteredGrainSpawns = grainSpawns.filter((grainSpawn) => 
    grainSpawn.species.name.toLowerCase().includes(search.toLowerCase()) ||
    grainSpawn.id.toString().includes(search),
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
          <h1 className="page-header-title">
            Grain Spawns
          </h1>
        </div>
        <p className="page-header-subtitle">
          Manage your grain spawn collection
        </p>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto">
        <div className="content-card">
          
          <div className="mb-8">
            <SearchBar
              searchTerm={search}
              onSearchChange={setSearch}
              addLink="/grain-spawns/add"
              addButtonText="Add Grain Spawn" 
            />
          </div>

          <AsyncData error={error || deleteError} loading={isLoading}>
            <GrainSpawnTable
              grainSpawnData={filteredGrainSpawns}
              onDelete={deleteGrainSpawn}
            />
          </AsyncData>
        </div>
      </div>
    </div>
  );
}