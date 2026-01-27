import GrainSpawnRow from './GrainSpawnRow';
import { FaFlask } from 'react-icons/fa';

export default function GrainSpawnsTable({ grainSpawnData, onEdit, onDelete }) {
  if (grainSpawnData.length === 0) {
    return (
      <div className="text-center py-16 px-4">
        <div
          className="inline-flex items-center justify-center w-20 h-20 rounded-full 
        bg-linear-to-br from-teal-100 to-cyan-100 dark:from-teal-900/30 dark:to-cyan-900/30 mb-6"
        >
          <FaFlask className="w-10 h-10 text-teal-500 dark:text-teal-400" />
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-xl font-medium">
          No grain spawns found
        </p>
        <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
          Try adjusting your search or create your first grain spawn
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Scrollable wrapper */}
      <div
        className="overflow-x-auto scrollbar-thin scrollbar-thumb-teal-400 scrollbar-track-gray-200 
        dark:scrollbar-thumb-teal-600 dark:scrollbar-track-gray-800 
        rounded-2xl border border-gray-200/50 dark:border-gray-700/50
        shadow-sm hover:shadow-md transition-shadow duration-300"
      >
        {/* Inner container with minimum width */}
        <div className="min-w-200">
          <table className="w-full">
            <thead>
              <tr
                className="bg-linear-to-r from-teal-50 to-cyan-50 dark:from-gray-800/80 dark:to-gray-800/60 
              border-b border-gray-200/50 dark:border-gray-700/50"
              >
                <th
                  className="text-left p-5 font-semibold text-gray-700 
                dark:text-gray-300 text-sm uppercase tracking-wider whitespace-nowrap"
                >
                  ID
                </th>

                <th
                  className="text-left p-5 font-semibold text-gray-700 
                dark:text-gray-300 text-sm uppercase tracking-wider whitespace-nowrap"
                >
                  Species
                </th>

                <th
                  className="text-left p-5 font-semibold text-gray-700 
                dark:text-gray-300 text-sm uppercase tracking-wider whitespace-nowrap"
                >
                  Inoculation Date
                </th>

                <th
                  className="text-left p-5 font-semibold text-gray-700 
                dark:text-gray-300 text-sm uppercase tracking-wider whitespace-nowrap"
                >
                  Shaken?
                </th>

                <th
                  className="text-left p-5 font-semibold text-gray-700 
                dark:text-gray-300 text-sm uppercase tracking-wider whitespace-nowrap"
                >
                  Parent
                </th>

                <th
                  className="text-left p-5 font-semibold text-gray-700
                dark:text-gray-300 text-sm uppercase tracking-wider whitespace-nowrap"
                >
                  Characteristic
                </th>

                <th
                  className="sticky right-0 bg-teal-50 dark:bg-gray-800/80 
                  text-right p-5 font-semibold text-gray-700 
                  dark:text-gray-300 text-sm uppercase tracking-wider whitespace-nowrap
                  shadow-[-4px_0_8px_rgba(0,0,0,0.05)] dark:shadow-[-4px_0_8px_rgba(0,0,0,0.2)]"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200/50 dark:divide-gray-700/50">
              {grainSpawnData.map((gs) => (
                <GrainSpawnRow
                  key={gs.id}
                  id={gs.id}
                  grainSpawn={gs}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Gradient fade indicators for scroll */}
      <div
        className="md:hidden pointer-events-none absolute right-0 top-0 bottom-0 w-16 
        bg-linear-to-l from-white dark:from-gray-900 to-transparent opacity-80"
      />
    </div>
  );
}
