import { FaFlask } from 'react-icons/fa';
import SpeciesRow from './SpeciesRow';

export default function SpeciesTable({speciesData, onDelete}) {

  if (speciesData.length === 0) {
    return (
      <div className="text-center py-16 px-4">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full 
        bg-linear-to-br from-teal-100 to-cyan-100 dark:from-teal-900/30 dark:to-cyan-900/30 mb-6">
          <FaFlask className="w-10 h-10 text-teal-500 dark:text-teal-400" />
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-xl font-medium">No species found</p>
        <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
          Try adjusting your search or create your first species
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
      <table className="w-full">
        <thead>
          <tr className="bg-linear-to-r from-teal-50 to-cyan-50 dark:from-gray-800/80 dark:to-gray-800/60
          border-b border-gray-200/50 dark:border-gray-700/50"  data-cy="species">
            <th className="text-left p-5 font-semibold text-gray-700 dark:text-gray-300 
            text-sm uppercase tracking-wider" data-cy="species_id">
              ID
            </th>
            <th className="text-left p-5 font-semibold text-gray-700 dark:text-gray-300 
            text-sm uppercase tracking-wider" data-cy="species_name">
              Species
            </th>
            <th className="text-right p-5 font-semibold text-gray-700 dark:text-gray-300 
            text-sm uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200/50 dark:divide-gray-700/50"
          data-cy="species">
          {speciesData.map((species) => (
            <SpeciesRow 
              key={species.id} 
              id={species.id} 
              speciesName={species.name}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}