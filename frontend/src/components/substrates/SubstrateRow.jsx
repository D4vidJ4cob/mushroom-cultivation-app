import { FaTrash, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router';

export default function SubstrateRow({id, substrate, onDelete = () => {} }) {
    
  const handleDelete = () => {
    onDelete(id);
  };

  const formattedInoculationDate = new Date(substrate.inoculationDate).toLocaleDateString('nl-BE');
  const formattedIncubationDate = new Date(substrate.incubationDate).toLocaleDateString('nl-BE');

  return (
    <tr className="group hover:bg-gradient-to-r hover:from-teal-50/50 hover:to-cyan-50/50 
    dark:hover:from-teal-900/10 dark:hover:to-cyan-900/10 transition-all duration-300">
              
      <td className="p-5">
        <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl 
        bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 
        text-gray-700 dark:text-gray-300 font-semibold text-sm
        group-hover:from-teal-100 group-hover:to-cyan-100 
        dark:group-hover:from-teal-900/30 dark:group-hover:to-cyan-900/30
        group-hover:text-teal-700 dark:group-hover:text-teal-400 transition-all duration-300">
          {substrate.id}
        </span>
      </td>
      
      <td className="p-5">
        <Link 
          to={`/substrates/${id}`}
          className="font-semibold text-gray-800 dark:text-gray-200 text-lg
        group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors"
        >
          {substrate.grainSpawn.species.name}
        </Link>
      </td>
              
      <td className="p-5">
        <span className="text-gray-600 dark:text-gray-400">
          {formattedInoculationDate}
        </span>
      </td>
      
      <td className="p-5">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold
        ${substrate.contaminationStatus 
      ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' 
      : 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'}`}>
          {substrate.contaminationStatus ? 'Contaminated' : 'Clean'}
        </span>
      </td>
      
      <td className="p-5">
        <span className="text-gray-600 dark:text-gray-400">
          {formattedIncubationDate}
        </span>
      </td>
              
      <td className="p-5">
        <div className="flex items-center justify-end gap-2">
          <Link
            to={`/substrates/edit/${id}`} 
            className="group/btn p-3 bg-gradient-to-br from-amber-400 to-orange-500 
            hover:from-amber-500 hover:to-orange-600
            dark:from-amber-500 dark:to-orange-600 dark:hover:from-amber-400 dark:hover:to-orange-500
            text-white rounded-xl shadow-md hover:shadow-lg
            transform hover:scale-110 active:scale-95 transition-all duration-300
            relative overflow-hidden"
            aria-label="Edit"
          >
            <span className="absolute inset-0 bg-white/20 scale-0 group-hover/btn:scale-100 
            transition-transform duration-300 rounded-xl"></span>
            <FaEdit className="w-4 h-4 relative z-10" />
          </Link>
          
          <button 
            onClick={handleDelete}
            className="group/btn p-3 bg-gradient-to-br from-red-400 to-rose-500 
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