import { Link, NavLink } from 'react-router';
import { useState } from 'react';
import { useTheme } from '../contexts';
import { IoSunny, IoMoonSharp } from 'react-icons/io5';
import { useAuth } from '../contexts/auth';

const NavItem = ({ to, children, options }) => {
  return (
    <li>
      <NavLink 
        className={`text-gray-600 dark:text-gray-300 
        aria-[current=page]:text-teal-600 dark:aria-[current=page]:text-teal-400 
        aria-[current=page]:font-semibold 
        hover:text-teal-500 dark:hover:text-teal-400 
        transition-all duration-300 ${options}`} 
        to={to}
      >
        {children}
      </NavLink>
    </li>
  );
};

const ThemeToggle = () => {
  const {darkmode, toggleDarkmode} = useTheme();
  return (
    <button 
      className='p-2.5 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 
      dark:from-gray-700 dark:to-gray-800
      hover:from-teal-100 hover:to-cyan-100 dark:hover:from-teal-900/30 dark:hover:to-cyan-900/30
      transform hover:scale-110 active:scale-95 transition-all duration-300
      shadow-md hover:shadow-lg' 
      onClick={toggleDarkmode}
      aria-label="Toggle theme"
    >
      {darkmode ? (
        <IoMoonSharp className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      ) : (
        <IoSunny className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      )}
    </button>
  );
};

const AuthButtons = () => {
  const {isAuthed} = useAuth();

  if (isAuthed) {
    return (
      <Link 
        to='/logout' data-cy='logout_btn'
        className='px-5 py-2.5 rounded-xl font-semibold
        bg-gradient-to-r from-red-500 to-rose-500 
        hover:from-red-600 hover:to-rose-600
        dark:from-red-600 dark:to-rose-600 dark:hover:from-red-500 dark:hover:to-rose-500
        text-white shadow-md hover:shadow-lg
        transform hover:scale-105 active:scale-95
        transition-all duration-300'
      >
        Logout
      </Link>
    );
  } else {
    return (
      <Link 
        to='/login' 
        className='px-5 py-2.5 rounded-xl font-semibold
        bg-gradient-to-r from-teal-500 to-cyan-500 
        hover:from-teal-600 hover:to-cyan-600
        dark:from-teal-600 dark:to-cyan-600 dark:hover:from-teal-500 dark:hover:to-cyan-500
        text-white shadow-md hover:shadow-lg
        transform hover:scale-105 active:scale-95
        transition-all duration-300'
      >
        Login
      </Link>
    );
  }
};

export default function Navbar() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  return (
    <>
      {/* Desktop Navbar met glassmorphism */}
      <nav className="sticky top-0 z-40 px-6 py-4 flex justify-between items-center 
      backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 
      border-b border-gray-200/50 dark:border-gray-700/50
      shadow-lg">
        
        {/* Logo */}
        <div className="flex items-center">
          <Link 
            to="/" 
            className="flex items-center gap-3 group"
          >
            <div className="text-4xl transform group-hover:scale-110 transition-transform duration-300">
              🍄
            </div>
            <span className="font-bold text-2xl bg-gradient-to-r from-teal-600 to-cyan-600 
            dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent
            group-hover:from-teal-500 group-hover:to-cyan-500
            dark:group-hover:from-teal-300 dark:group-hover:to-cyan-300
            transition-all duration-300">
              D&D Mushrooms
            </span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden">
          <button 
            className="p-3 rounded-xl bg-gradient-to-br from-teal-100 to-cyan-100 
            dark:from-teal-900/30 dark:to-cyan-900/30
            hover:from-teal-200 hover:to-cyan-200 dark:hover:from-teal-900/50 dark:hover:to-cyan-900/50
            transform hover:scale-110 active:scale-95 transition-all duration-300
            shadow-md" 
            onClick={toggleNavbar}
            aria-label="Toggle menu"
          >
            <svg className="h-5 w-5 text-teal-600 dark:text-teal-400" viewBox="0 0 20 20" 
              xmlns="http://www.w3.org/2000/svg" fill="currentColor">
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
          </button>
        </div>

        {/* Desktop menu */}
        <ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 
        lg:flex lg:items-center lg:space-x-8">
          <NavItem to="/species">Species</NavItem>
          <NavItem to="/mother-cultures">Mother Cultures</NavItem>
          <NavItem to="/liquid-cultures">Liquid Cultures</NavItem>
          <NavItem to="/grain-spawns">Grain Spawns</NavItem>
          <NavItem to="/substrates">Substrates</NavItem>
        </ul>
        
        <div className='hidden lg:flex items-center gap-3'>
          <AuthButtons />
          <ThemeToggle />
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div className={`relative z-50 ${isNavbarOpen ? 'block' : 'hidden'}`}>
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity duration-300"
          onClick={toggleNavbar}
        ></div>
        
        {/* Sidebar met glassmorphism */}
        <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 
        backdrop-blur-xl bg-white/95 dark:bg-gray-900/95 
        border-r border-gray-200/50 dark:border-gray-700/50
        overflow-y-auto shadow-2xl">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Link 
              to="/" 
              className="flex items-center gap-3 group"
              onClick={toggleNavbar}
            >
              <span className="text-3xl transform group-hover:scale-110 transition-transform duration-300">
                🍄
              </span>
              <span className="font-bold text-xl bg-gradient-to-r from-teal-600 to-cyan-600 
              dark:from-teal-400 dark:to-cyan-400 bg-clip-text text-transparent">
                Mushroom Cultivation
              </span>
            </Link>
            <button 
              onClick={toggleNavbar}
              className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 
              transition-all duration-300"
              aria-label="Close menu"
            >
              <svg 
                className="h-6 w-6 text-gray-600 dark:text-gray-400"
                xmlns="http://www.w3.org/2000/svg" 
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          {/* Navigation Links */}
          <div className="flex-1">
            <ul className="space-y-2">
              <NavItem 
                to="/species" 
                options="flex items-center gap-3 p-4 text-base font-semibold 
                rounded-xl hover:bg-gradient-to-r hover:from-teal-50 hover:to-cyan-50 
                dark:hover:from-teal-900/20 dark:hover:to-cyan-900/20
                transition-all duration-300"
              >
                <span className="text-2xl">🔬</span>
                <span>Species</span>
              </NavItem>
              <NavItem 
                to="/mother-cultures" 
                options="flex items-center gap-3 p-4 text-base font-semibold 
                rounded-xl hover:bg-gradient-to-r hover:from-teal-50 hover:to-cyan-50 
                dark:hover:from-teal-900/20 dark:hover:to-cyan-900/20
                transition-all duration-300"
              >
                <span className="text-2xl">🧫</span>
                <span>Mother Cultures</span>
              </NavItem>
              <NavItem 
                to="/liquid-cultures" 
                options="flex items-center gap-3 p-4 text-base font-semibold 
                rounded-xl hover:bg-gradient-to-r hover:from-teal-50 hover:to-cyan-50 
                dark:hover:from-teal-900/20 dark:hover:to-cyan-900/20
                transition-all duration-300"
              >
                <span className="text-2xl">🧪</span>
                <span>Liquid Cultures</span>
              </NavItem>
              <NavItem 
                to="/grain-spawns" 
                options="flex items-center gap-3 p-4 text-base font-semibold 
                rounded-xl hover:bg-gradient-to-r hover:from-teal-50 hover:to-cyan-50 
                dark:hover:from-teal-900/20 dark:hover:to-cyan-900/20
                transition-all duration-300"
              >
                <span className="text-2xl">🌾</span>
                <span>Grain Spawns</span>
              </NavItem>
              <NavItem 
                to="/substrates" 
                options="flex items-center gap-3 p-4 text-base font-semibold 
                rounded-xl hover:bg-gradient-to-r hover:from-teal-50 hover:to-cyan-50 
                dark:hover:from-teal-900/20 dark:hover:to-cyan-900/20
                transition-all duration-300"
              >
                <span className="text-2xl">🪵</span>
                <span>Substrates</span>
              </NavItem>
            </ul>
          </div>

          {/* Mobile Auth & Theme Toggle */}
          <div className="pt-6 border-t border-gray-200 dark:border-gray-700 mt-6">
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <AuthButtons />
              </div>
              <ThemeToggle />
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}