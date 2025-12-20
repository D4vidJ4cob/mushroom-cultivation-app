// src/pages/species/SpeciesDetail.jsx
import { useParams } from 'react-router';
import useSWR from 'swr';
import { getById } from '../../api';
import AsyncData from '../../components/AsyncData';
import { FaDna } from 'react-icons/fa';

const SpeciesDetail = () => {
  const { id } = useParams();
  
  const { data: species, error, isLoading } = useSWR(
    `species/${id}`,
    getById,
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 
    to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 p-6 
    flex items-center justify-center">
      
      <div className="w-full max-w-md">
        <div className="backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 
        rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/30 p-12 text-center">
          <AsyncData error={error} loading={isLoading}>
            {species && (
              <div>
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full 
                bg-gradient-to-br from-teal-400 to-cyan-500 dark:from-teal-500 dark:to-cyan-600 
                mb-8 shadow-2xl">
                  <FaDna className="w-12 h-12 text-white" />
                </div>
                
                {/* Species Name */}
                <h1 className="text-5xl font-bold bg-gradient-to-r from-teal-600 
                to-cyan-600 dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent mb-6 
                leading-tight">
                  {species.name}
                </h1>
                
                {/* ID Badge */}
                <div className="inline-flex items-center px-6 py-3 rounded-full 
                bg-gray-100 dark:bg-gray-700">
                  <span className="text-gray-600 dark:text-gray-400 text-sm font-medium">
                    Species ID: <span className="font-bold text-gray-800 dark:text-gray-200">#{species.id}</span>
                  </span>
                </div>
                
                {/* QR Code Placeholder
                <div className="mt-8 p-8 rounded-2xl bg-white dark:bg-gray-900 border-2 
                border-dashed border-gray-300 dark:border-gray-600">
                  <p className="text-gray-400 dark:text-gray-500 text-sm">
                    QR Code will be displayed here
                  </p>
                </div> */}
              </div>
            )}
          </AsyncData>
        </div>
      </div>
    </div>
  );
};

export default SpeciesDetail;