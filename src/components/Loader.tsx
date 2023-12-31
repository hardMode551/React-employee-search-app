import React from 'react'

import styles from '../styles/Loader.module.scss'

const Loader: React.FC = () => {
  return (
    <div className={styles["loader-container"]}>
      <div className={styles["loader"]}></div>
    </div>
  )
}

export default Loader