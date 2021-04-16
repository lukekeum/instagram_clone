import React from 'react';
import HomeComponent from '../components/Home';
import Navbar from '../components/Navbar';

function Home() {
  return (
    <React.Fragment>
      <Navbar />
      <HomeComponent />
    </React.Fragment>
  );
}

export default Home;
