// src/pages/Home.jsx
import { Link } from 'react-router';
import { FaFlask, FaSeedling, FaBoxes, FaDna, FaArrowRight } from 'react-icons/fa';
import { useAuth } from '../contexts/auth';

export default function Home() {
  const { user } = useAuth();

  const stats = [
    { icon: FaDna, label: 'Species', count: '3+', 
      color: 'from-teal-400 to-cyan-500', link: '/species' },

    { icon: FaFlask, label: 'Cultures', count: '20+', 
      color: 'from-cyan-400 to-blue-500', link: '/mother-cultures' },

    { icon: FaSeedling, label: 'Grain Spawns', count: '50+', 
      color: 'from-amber-400 to-orange-500', link: '/grain-spawns' },
      
    { icon: FaBoxes, label: 'Substrates', count: '100+', 
      color: 'from-indigo-400 to-purple-500', link: '/substrates' },
  ];

  const features = [
    {
      icon: FaDna,
      title: 'Species Management',
      description: 'Track and manage different mushroom species in your cultivation lab.',
      link: '/species',
      gradient: 'from-teal-500 to-cyan-600',
    },
    {
      icon: FaFlask,
      title: 'Culture Tracking',
      description: 'Monitor mother cultures and liquid cultures with inoculation dates and characteristics.',
      link: '/mother-cultures',
      gradient: 'from-cyan-500 to-blue-600',
    },
    {
      icon: FaSeedling,
      title: 'Grain Spawn Control',
      description: 'Manage grain spawns from cultures to substrates with full traceability.',
      link: '/grain-spawns',
      gradient: 'from-amber-500 to-orange-600',
    },
    {
      icon: FaBoxes,
      title: 'Substrate Production',
      description: 'Track substrate batches, incubation dates, and team assignments.',
      link: '/substrates',
      gradient: 'from-indigo-500 to-purple-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 
    to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 via-cyan-500/10 
        to-blue-500/10 dark:from-teal-500/5 dark:via-cyan-500/5 dark:to-blue-500/5"></div>
        
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full 
            bg-gradient-to-br from-teal-400 to-cyan-500 dark:from-teal-500 dark:to-cyan-600 
            mb-6 shadow-2xl">
              <FaFlask className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 
              dark:from-teal-400 dark:via-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
                D&D Mushrooms
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
              Professional cultivation tracking from culture to harvest. 
              {user && ` Welcome back, ${user.name}! 🍄`}
            </p>

            <div className="flex gap-4 justify-center">
              <Link
                to="/grain-spawns"
                className="group px-8 py-4 bg-gradient-to-r from-teal-500 to-cyan-500 
                hover:from-teal-600 hover:to-cyan-600 text-white rounded-xl font-semibold 
                shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300
                flex items-center gap-2"
              >
                View Dashboard
              </Link>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {stats.map((stat, index) => (
              <Link
                key={index}
                to={stat.link}
                className="group backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 
                rounded-2xl p-6 border border-white/20 dark:border-gray-700/30 
                hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl 
                bg-gradient-to-br ${stat.color} mb-4 shadow-lg 
                group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-1">
                  {stat.count}
                </p>
                <p className="text-gray-600 dark:text-gray-400 font-medium">
                  {stat.label}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
            Complete Cultivation Management
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Everything you need to track your mushroom cultivation from start to finish
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Link
              key={index}
              to={feature.link}
              className="group backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 
              rounded-3xl p-8 border border-white/20 dark:border-gray-700/30 
              hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl 
              bg-gradient-to-br ${feature.gradient} mb-6 shadow-lg 
              group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3 
              group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {feature.description}
              </p>
              
              <div className="flex items-center text-teal-600 dark:text-teal-400 font-semibold">
                Learn more
                <FaArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}