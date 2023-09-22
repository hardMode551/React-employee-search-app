import React from 'react';
import { useSelector } from 'react-redux';
import SiteHeader from '../components/SiteHeader';
import UserProfile from '../components/UserProfile';
import ResultBlock from '../components/ResultBlock';
import { RootState } from '../store/store';

import '../styles/main.scss';

const HomePage: React.FC = () => {
  const user = useSelector((state: RootState) => state.users);

  return (
    <div>
      <SiteHeader />
      <div className="container">
        <UserProfile user={user} />
        <ResultBlock />
      </div>
    </div>
  );
};

export default HomePage;
