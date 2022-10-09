import React from 'react';
import logo from './logo.svg';
import './components/styles/App.css';
import './components/styles/Navbar.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import RQSuperHeroes from './components/RQSuperHeroes';
import SuperHeroes from './components/Superheroes';
import Navbar from './components/Navbar';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from "react-query/devtools";
import RQSuperHero from './components/RQSuperheroDetails';
import ParallelQueries from './components/ParallelQueries';
import DynamicParallelQueries from './components/DynamicParallelQueries';
import DependentQueries from './components/DependentQueries';
import PaginatedQueries from './components/PaginatedQueries';
import InfiniteQueries from './components/InfiniteQueries';

function App() {

  const queryClient = new QueryClient();

  const navList = [
    { name: 'Home', path: '/' },
    { name: 'Traditional Superheroes', path: '/super-heroes' },
    { name: 'RQ Superheroes', path: '/rq-super-heroes' },
    { name: 'Parallel Queries', path: '/rq-parallel' },
    { name: 'Dynamic Parallel Queries', path: '/rq-dynamic-parallel' },
    { name: 'Dependent Queries', path: '/rq-dependent' },
    { name: 'Pagination', path: '/rq-paginated' },
    { name: 'Infinite Queries', path: '/rq-infinite' },
  ]

  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <div>
          <Navbar navList={navList} />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/super-heroes' element={<SuperHeroes />} />
            <Route path='/rq-super-heroes' element={<RQSuperHeroes />} />
            <Route path='/rq-super-heroes/:heroId' element={<RQSuperHero />} />
            <Route path='/rq-parallel' element={<ParallelQueries />} />
            <Route path='/rq-dynamic-parallel' element={<DynamicParallelQueries heroIds={[1, 3, 4]} />} />
            <Route
              path='/rq-dependent'
              element={<DependentQueries email="faris@foothillsolutions.com" />}
            />
            <Route path='/rq-paginated' element={<PaginatedQueries />} />
            <Route path='/rq-infinite' element={<InfiniteQueries />} />
          </Routes>
        </div>
      </div >
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </QueryClientProvider>
  );
}

export default App;
