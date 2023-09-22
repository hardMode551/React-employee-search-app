import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

import UserImage from '../assets/UserImage.svg';

import styles from '../styles/ResultBlock.module.scss'

const UserProfile: React.FC = () => {
  const { currentUser } = useSelector((state: RootState) => state.users);

  return (
    <div>
      {!currentUser ? (
        <div className={styles["select-user-message"]}>
          <p>Выберите сотрудника, чтобы посмотреть его профиль</p>
        </div>
      ) : (
        <div className={styles["user"]}>
          <img className={styles["user-image"]} src={UserImage} alt="image" />
          <div className={styles["user-info"]}>
            <h1 className={styles["user-name"]}>{currentUser?.name}</h1>
            <p className={styles["user-email"]}>
              Email: <b className={styles["grey-text"]}>{currentUser?.email}</b>
            </p>
            <p className={styles["user-phone"]}>
              Phone: <b className={styles["grey-text"]}>{currentUser?.phone}</b>
            </p>
            <div className={styles["user-description"]}>
              <h1 className={styles["user-description-title"]}>О сотруднике:</h1>
              <p className={`${styles["user-description-text"]} ${styles["grey-text"]}`}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                est laborum.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
