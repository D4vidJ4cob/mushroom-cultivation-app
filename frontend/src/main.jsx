import { createContext, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import SpeciesList from './pages/species/SpeciesList.jsx';
import NotFound from './pages/NotFound.jsx';
import MotherCulturesList from './pages/mother-cultures/MotherCulturesList.jsx';
import LiquidCulturesList from './pages/liquid-cultures/LiquidCulturesList.jsx';
import Layout from './pages/Layout.jsx';
import MotherCultureDetail from './pages/mother-cultures/MotherCultureDetail.jsx';
import GrainSpawnsList from './pages/grain-spawns/GrainSpawnsList.jsx';
import SubstratesList from './pages/substrates/SubstrateList.jsx';
import AddOrEditSpecies from './pages/species/AddOrEditSpecies.jsx';
import AddOrEditMotherCulture from './pages/mother-cultures/AddOrEditMotherCulture.jsx';
import AddOrEditLiquidCulture from './pages/liquid-cultures/AddOrEditLiquidCulture.jsx';
import AddOrEditGrainSpawn from './pages/grain-spawns/AddOrEditGrainSpawn.jsx';
import AddOrEditSubstrate from './pages/substrates/AddOrEditSubstrate.jsx';
import ThemeProvider from './contexts/Theme.context.jsx';
import AuthProvider from './contexts/Auth.context.jsx';
import Login from './pages/Login.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import Logout from './pages/Logout.jsx';
import LiquidCultureDetail from './pages/liquid-cultures/LiquidCulturesDetail.jsx';
import GrainSpawnDetail from './pages/grain-spawns/GrainSpawnDetail.jsx';
import SubstrateDetail from './pages/substrates/SubstrateDetail.jsx';
import Home from './pages/Home.jsx';
import SpeciesDetail from './pages/species/SpeciesDetail.jsx';

export const ThemeContext = createContext();
const router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      {
        path: '/',
        Component: Home,
      },
      {
        path: '/login',
        Component: Login,
      },
      {
        path: '/logout',
        Component: Logout,
      },
      {
        path: 'species',
        Component: PrivateRoute,
        children: [
          {
            index: true,
            Component: SpeciesList,
          },
          {
            path: ':id',
            Component: SpeciesDetail,
          },
          {
            path: 'add',
            Component: AddOrEditSpecies,
          },
          {
            path: 'edit/:id',
            Component: AddOrEditSpecies,
          },
        ],
      },
      {
        path: 'mother-cultures',
        Component: PrivateRoute,
        children: [
          {
            index: true,
            Component: MotherCulturesList,
          },
          {
            path: ':id',
            Component: MotherCultureDetail,
          },
          {
            path: 'add',
            Component: AddOrEditMotherCulture,
          },
          {
            path: 'edit/:id',
            Component: AddOrEditMotherCulture,
          },
        ],
      },
      {
        path: 'liquid-cultures',
        Component: PrivateRoute,
        children: [
          {
            index: true,
            Component: LiquidCulturesList,
          },
          {
            path: ':id',
            Component: LiquidCultureDetail,
          },
          {
            path: 'add',
            Component: AddOrEditLiquidCulture,
          },
          {
            path: 'edit/:id',
            Component: AddOrEditLiquidCulture,
          },
        ],
      },
      {
        path: 'grain-spawns',
        Component: PrivateRoute,
        children: [
          {
            index: true,
            Component: GrainSpawnsList,
          },
          {
            path: ':id',
            Component: GrainSpawnDetail,
          },
          {
            path: 'add',
            Component: AddOrEditGrainSpawn,
          },
          {
            path: 'edit/:id',
            Component: AddOrEditGrainSpawn,
          },
        ],
      },
      {
        path: 'substrates',
        Component: PrivateRoute,
        children: [
          {
            index: true,
            Component: SubstratesList,
          },
          {
            path: ':id',
            Component: SubstrateDetail,
          },
          {
            path: 'add',
            Component: AddOrEditSubstrate,
          },
          {
            path: 'edit/:id',
            Component: AddOrEditSubstrate,
          },
        ],
      },
      { path: '*', Component: NotFound },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>,
);
