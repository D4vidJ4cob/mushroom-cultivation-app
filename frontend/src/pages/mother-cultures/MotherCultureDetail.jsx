import { useParams } from 'react-router';
import useSWR from 'swr';
import { getById } from '../../api';
import AsyncData from '../../components/AsyncData';
import { FaFlask, FaCalendar, FaDna, FaSeedling } from 'react-icons/fa';

const MotherCultureDetail = () => {
  const { id } = useParams();
  
  const { data: motherCulture, error, isLoading } = useSWR(
    `mother-cultures/${id}`,
    getById,
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('nl-BE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 
    to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 p-6">
      
      <div className="max-w-4xl mx-auto">
        <div className="content-card">
          <AsyncData error={error} loading={isLoading}>
            {motherCulture && (
              <div>
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-linear-to-br from-teal-400 to-cyan-500 
                  dark:from-teal-500 dark:to-cyan-600 rounded-2xl shadow-lg">
                    <FaFlask className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold bg-linear-to-r from-teal-600 
                    to-cyan-600 dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
                      {motherCulture.name}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">Mother Culture #{motherCulture.id}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {/* Species */}
                  <div className="p-6 rounded-xl bg-linear-to-br from-teal-50 to-cyan-50 
                  dark:from-teal-900/20 dark:to-cyan-900/20 border border-teal-200/50 dark:border-teal-700/50">
                    <div className="flex items-center gap-3 mb-2">
                      <FaDna className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                      <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Species</p>
                    </div>
                    <p className="text-gray-800 dark:text-gray-200 font-semibold text-xl">
                      {motherCulture.species?.name || 'Unknown'}
                    </p>
                  </div>
                  
                  {/* Inoculation Date */}
                  <div className="p-6 rounded-xl bg-linear-to-br from-blue-50 to-indigo-50 
                  dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200/50 dark:border-blue-700/50">
                    <div className="flex items-center gap-3 mb-2">
                      <FaCalendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">Inoculation Date</p>
                    </div>
                    <p className="text-gray-800 dark:text-gray-200 font-semibold text-xl">
                      {formatDate(motherCulture.inoculationDate)}
                    </p>
                  </div>
                </div>

                {/* Characteristic */}
                {motherCulture.characteristic && (
                  <div className="p-6 rounded-xl bg-white/50 dark:bg-gray-900/50 border 
                  border-gray-200/50 dark:border-gray-700/50 mb-6">
                    <p className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-2">Characteristics</p>
                    <p className="text-gray-800 dark:text-gray-200 text-lg">
                      {motherCulture.characteristic}
                    </p>
                  </div>
                )}

                {/* Grain Spawns produced from this Mother Culture */}
                {motherCulture.grainSpawns && motherCulture.grainSpawns.length > 0 && (
                  <div className="p-6 rounded-xl bg-amber-50 dark:bg-amber-900/20 border 
                  border-amber-200/50 dark:border-amber-700/50">
                    <div className="flex items-center gap-3 mb-4">
                      <FaSeedling className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
                        Grain Spawns from this Culture
                      </h2>
                    </div>
                    <div className="space-y-2">
                      {motherCulture.grainSpawns.map((gs) => (
                        <div key={gs.id} className="p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                          <p className="text-gray-700 dark:text-gray-300">
                            Grain Spawn #{gs.id} - Inoculated: {formatDate(gs.inoculationDate)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </AsyncData>
        </div>
      </div>
    </div>
  );
};

export default MotherCultureDetail;