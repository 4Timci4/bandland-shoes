import React from 'react';
import Slider from '../components/Slider/Slider';
import Collection from '../components/Collection/Collection';
import About from '../components/About/About';
import Blog from '../components/Blog/Blog';
import Bestsellers from '../components/Bestsellers/Bestsellers';

const Home = () => {
  return (
    <>
      <Slider />
      <main>
        <Collection />
        <About />
        <Blog />
        <Bestsellers />
      </main>
    </>
  );
};

export default Home;
