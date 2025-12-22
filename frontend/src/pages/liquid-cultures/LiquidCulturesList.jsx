import { useState } from 'react';
import SearchBar from '../../components/SearchBar';
import LiquidCulturesTable from '../../components/liquid-cultures/liquidCulturesTable';
import AsyncData from '../../components/AsyncData';
import { getAll, deleteById } from '../../api';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { FaFlask } from 'react-icons/fa';

export default function LiquidCulturesList() {

  const [search, setSearch] = useState('');

  const {data:liquidCultures=[], error, isLoading} = useSWR('liquid-cultures', getAll);

  const { trigger: deleteLiquidCulture, error: deleteError } = useSWRMutation(
    'liquid-cultures',
    deleteById,
  );

  const filteredCultures = liquidCultures.filter((culture) => 
    culture.name.toLowerCase().includes(search.toLowerCase()) ||
    culture.species.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="page-container">
      
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center gap-4 mb-2">
          <div className="icon-badge">
            <FaFlask className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 
          dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
            Liquid Cultures
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400 ml-20 text-lg">
          Manage your liquid culture collection
        </p>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto">
        <div className="backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 rounded-3xl shadow-2xl border 
        border-white/20 dark:border-gray-700/30 p-8">
          
          <div className="mb-8">
            <SearchBar
              searchTerm={search}
              onSearchChange={setSearch}
              addLink="/liquid-cultures/add"
              addButtonText="Add Liquid Culture" 
            />
          </div>

          <AsyncData error={error || deleteError} loading={isLoading}>
            <LiquidCulturesTable
              cultureData={filteredCultures}
              onDelete={deleteLiquidCulture}
            />
          </AsyncData>
        </div>
      </div>
    </div>
  );
}