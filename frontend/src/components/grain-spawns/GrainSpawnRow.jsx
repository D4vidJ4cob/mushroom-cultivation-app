import { FaTrash, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router';

export default function GrainSpawnRow({id, grainSpawn, onEdit, onDelete = () => {} }) {

  const handleDelete = () => {
    onDelete(id);
  };

  const formattedDate = new Date(grainSpawn.inoculationDate).toLocaleDateString('nl-BE');

  const source = grainSpawn.motherCulture 
    ? `MC: ${grainSpawn.motherCulture.name}` 
    : grainSpawn.liquidCulture 
      ? `LC: ${grainSpawn.liquidCulture.name}`
      : 'Onbekend';

  return (
    <tr className="group hover:bg-linear-to-r hover:from-teal-50/50 hover:to-cyan-50/50 
    dark:hover:from-teal-900/10 dark:hover:to-cyan-900/10 transition-all duration-300">
              
      <td className="p-5">
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl 
        bg-linear-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 
        text-gray-700 dark:text-gray-300 font-semibold text-sm
        group-hover:from-teal-100 group-hover:to-cyan-100 
        dark:group-hover:from-teal-900/30 dark:group-hover:to-cyan-900/30
        group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-all duration-300">
          {id}
        </span>
      </td>
      
      <td className="p-5">
        <Link 
          to= {`/grain-spawns/${id}`}
          className="font-semibold text-gray-800 dark:text-gray-200 text-lg
        group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
          {grainSpawn.species.name}
        
        </Link>
      </td>
              
      <td className="p-5">
        <span className="text-gray-600 dark:text-gray-400">
          {formattedDate}
        </span>
      </td>
      
      <td className="p-5">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold
        ${grainSpawn.shaken 
      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' 
      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-400'}`}>
          {grainSpawn.shaken ? 'Yes' : 'No'}
        </span>
      </td>
      
      <td className="p-5">
        <span className="text-gray-600 dark:text-gray-400">
          {source}
        </span>
      </td>
      
      <td className="p-5">
        <span className="text-gray-600 dark:text-gray-400">
          {grainSpawn.characteristic}
        </span>
      </td>
              
      <td className="p-5">
        <div className="flex items-center justify-end gap-2">
          <Link 
            to={`/grain-spawns/edit/${id}`}
            className="group/btn p-3 bg-linear-to-br from-amber-400 to-orange-500 
            hover:from-amber-500 hover:to-orange-600
            dark:from-amber-500 dark:to-orange-600 dark:hover:from-amber-400 dark:hover:to-orange-500
            text-white rounded-xl shadow-md hover:shadow-lg
            transform hover:scale-110 active:scale-95 transition-all duration-300
            relative overflow-hidden"
            onClick={() => onEdit && onEdit(id)}
            aria-label="Edit"
          >
            <span className="absolute inset-0 bg-white/20 scale-0 group-hover/btn:scale-100 
            transition-transform duration-300 rounded-xl"></span>
            <FaEdit className="w-4 h-4 relative z-10" />
          </Link>
          
          <button 
            onClick={handleDelete}
            className="group/btn p-3 bg-linear-to-br from-red-400 to-rose-500 
            hover:from-red-500 hover:to-rose-600
            dark:from-red-500 dark:to-rose-600 dark:hover:from-red-400 dark:hover:to-rose-500
            text-white rounded-xl shadow-md hover:shadow-lg
            transform hover:scale-110 active:scale-95 transition-all duration-300
            relative overflow-hidden"
            aria-label="Delete"
          >
            <span className="absolute inset-0 bg-white/20 scale-0 group-hover/btn:scale-100 
            transition-transform duration-300 rounded-xl"></span>
            <FaTrash className="w-4 h-4 relative z-10" />
          </button>
        </div>
      </td>
    </tr>
  );
}