import React from 'react';
import Hero from '../components/Home/Hero';
import FeaturedSections from '../components/Home/FeaturedSections';
import CategorySection from '../components/Home/CategorySection';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <CategorySection />
      <FeaturedSections />
    </>
  );
};

export default Home;