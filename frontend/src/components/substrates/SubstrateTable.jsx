import SubstrateRow from './SubstrateRow';
import { FaFlask } from 'react-icons/fa';

export default function SubstratesTable({substrateData, onDelete}) {

  if (substrateData.length === 0) {
    return (
      <div className="text-center py-16 px-4">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full 
        bg-gradient-to-br from-teal-100 to-cyan-100 dark:from-teal-900/30 dark:to-cyan-900/30 mb-6">
          <FaFlask className="w-10 h-10 text-teal-500 dark:text-teal-400" />
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-xl font-medium">No substrates found</p>
        <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
          Try adjusting your search or create your first substrate
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200/50 dark:border-gray-700/50">
      <table className="w-full">
        <thead>
          <tr className="bg-gradient-to-r from-teal-50 to-cyan-50 dark:from-gray-800/80 dark:to-gray-800/60 
          border-b border-gray-200/50 dark:border-gray-700/50">

            <th className="text-left p-5 font-semibold text-gray-700 
            dark:text-gray-300 text-sm uppercase tracking-wider">ID</th>

            <th className="text-left p-5 font-semibold text-gray-700 
            dark:text-gray-300 text-sm uppercase tracking-wider">Name</th>

            <th className="text-left p-5 font-semibold text-gray-700 
            dark:text-gray-300 text-sm uppercase tracking-wider">Inoculation Date</th>

            <th className="text-left p-5 font-semibold text-gray-700 
            dark:text-gray-300 text-sm uppercase tracking-wider">Contamination Status</th>

            <th className="text-left p-5 font-semibold text-gray-700 
            dark:text-gray-300 text-sm uppercase tracking-wider">Incubation Date</th>
            
            <th className="text-right p-5 font-semibold text-gray-700 
            dark:text-gray-300 text-sm uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
          {substrateData.map((s) => (
            <SubstrateRow 
              key={s.id} 
              id={s.id}
              substrate={s}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}