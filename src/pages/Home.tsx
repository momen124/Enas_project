import React, { Suspense, lazy } from 'react';
import Hero from '../components/Home/Hero';
// import LoadingSpinner from '../components/LoadingSpinner'; // Assume a simple spinner component

const FeaturedSections = lazy(() => import('../components/Home/FeaturedSections'));
const CategorySection = lazy(() => import('../components/Home/CategorySection'));

const Home: React.FC = () => {
  return (
    <div className="bg-background">
      <Hero />
      {/* <Suspense fallback={<LoadingSpinner />}> */}
        <FeaturedSections />
        <CategorySection />
      {/* </Suspense> */}
    </div>
  );
};

export default Home;