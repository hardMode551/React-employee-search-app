import React from 'react';

import SiteHeader from '../components/SiteHeader';
import UserProfile from '../components/UserProfile';
import ResultBlock from '../components/ResultBlock';

import '../styles/main.scss';

const HomePage: React.FC = () => {
  return (
    <div>
      <SiteHeader />
      <div className="container">
        <UserProfile />
        <ResultBlock />
      </div>
    </div>
  );
};

export default HomePage;
