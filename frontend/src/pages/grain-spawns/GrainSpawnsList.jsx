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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 
    dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 p-6">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center gap-4 mb-2">
          <div className="p-3 bg-gradient-to-br from-teal-400 to-cyan-500 
          dark:from-teal-500 dark:to-cyan-600 rounded-2xl shadow-lg">
            <FaFlask className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 
          dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
            Grain Spawns
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400 ml-20 text-lg">
          Manage your grain spawn collection
        </p>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto">
        <div className="backdrop-blur-xl bg-white/70 
        dark:bg-gray-800/70 rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/30 p-8">
          
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