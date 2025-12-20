import { FaSearch, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router';

export default function SearchBar({ searchTerm, onSearchChange, addLink, addButtonText }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4">

      <div className="flex-1 relative group">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 
        group-hover:text-teal-500 dark:group-hover:text-teal-400 transition-colors z-10" />
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-12 pr-4 py-3.5 bg-white/50 dark:bg-gray-900/50 
          border-2 border-gray-200/50 dark:border-gray-700/50 rounded-2xl
          focus:outline-none focus:border-teal-400 dark:focus:border-teal-500 
          focus:ring-4 focus:ring-teal-400/20 dark:focus:ring-teal-500/20
          text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500
          backdrop-blur-sm transition-all duration-300"
        />
      </div>
      
      <Link 
        to={addLink}
        data-cy="add_species_btn" 
        className="group relative px-6 py-3.5 bg-gradient-to-r from-teal-500 to-cyan-500 
        hover:from-teal-600 hover:to-cyan-600
        dark:from-teal-600 dark:to-cyan-600 dark:hover:from-teal-500 dark:hover:to-cyan-500
        text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl
        transform hover:scale-105 active:scale-95 transition-all duration-300
        flex items-center justify-center gap-2 overflow-hidden"
      >
        <span className="absolute inset-0 bg-white/20 translate-y-full 
        group-hover:translate-y-0 transition-transform duration-300"></span>
        <FaPlus className="relative z-10" />
        <span className="relative z-10">{addButtonText}</span>
      </Link>
    </div>
  );
}