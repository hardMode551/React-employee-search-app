import React from 'react';

import styles from '../styles/SiteHeader.module.scss';

const SiteHeader: React.FC = () => {
  return (
    <header>
      <div className={styles["logo"]}>Жилфонд</div>
      <p className={styles["site-title"]}>Пользователь</p>
    </header>
  );
};

export default SiteHeader;
