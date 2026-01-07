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
          <div className="icon-badge bg-linear-to-br from-teal-400 to-cyan-500 dark:from-teal-500 
          dark:to-cyan-600">
            <FaFlask className="w-8 h-8 text-white" />
          </div>
          <h1 className="page-header-title">
            Liquid Cultures
          </h1>
        </div>
        <p className="page-header-subtitle">
          Manage your liquid culture collection
        </p>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto">
        <div className="content-card">
          
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