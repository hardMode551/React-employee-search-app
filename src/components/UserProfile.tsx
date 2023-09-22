import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { debounce } from 'lodash';

import { Dispatch } from 'redux';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../store/store';
import { User } from '../store/slices/types';
import { setCurrentUser, setError, setLoading, setUsers } from '../store/slices/UserSlice';

import UserImage from '../assets/UserImage.svg';

import styles from '../styles/UserProfile.module.scss';
import Loader from './Loader';

const UserProfile: React.FC = () => {
  const [searchInput, setSearchInput] = useState<string>('');
  const { users, currentUser, loading, error } = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch();


  const userSelected = (user: User | null) => {
    if (currentUser === user) {
      dispatch(setCurrentUser(null));
    } else {
      dispatch(setCurrentUser(user));
    }
  };

  const debouncedSearchUsers = debounce(async (searchInput: string, dispatch: Dispatch) => {
    // Разбиваем строку по запятым и удаляем пустые строки
    const searchArray = searchInput
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);

    if (searchArray.length === 0) {
      dispatch(setUsers([]));
      dispatch(setError(null));
      dispatch(setLoading(false)); // Устанавливаем loading в false, чтобы скрыть сообщение о загрузке
      return;
    }

    const isNumeric = /^\d+$/.test(searchArray[0]);

    dispatch(setLoading(true));
    dispatch(setError(null));

    try {

      const requests = searchArray.map((item) => {
        if (isNumeric) {
          return axios.get(`https://jsonplaceholder.typicode.com/users/${item}`);
        } else {
          return axios.get('https://jsonplaceholder.typicode.com/users', {
            params: { name_like: item },
          });
        }
      });

      const responses = await Promise.all(requests);
      const users = responses.map((response) => response.data);

      dispatch(setUsers(users.filter(Boolean)));
    } catch (error) {
      dispatch(setUsers([]));
      dispatch(setError((error as Error).message));
    } finally {
      dispatch(setLoading(false));
    }
  }, 700);


  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const cleanedInput = searchInput.replace(/,+/g, ',');
    const cleanedInput = e.target.value.replace(/,+/, ',');
    if (cleanedInput !== searchInput) {
      setSearchInput(cleanedInput);
    }
  };

  useEffect(() => {
    // Отслеживание изменений в searchInput и выполнение поиска с задержкой
    const names = searchInput.split(',').map((name) => name.trim());
    debouncedSearchUsers(names.join(','), dispatch);
  }, [searchInput]);

  return (
    <div className={styles["search-bar"]}>

      <h3 className={styles["search-bar-title"]}>Поиск сотрудников</h3>
      <input
        className={styles["search-bar-input"]}
        value={searchInput}
        onChange={handleInput}
        placeholder="Введите Id или имя"
      />

      <h3 className={styles["search-bar-title"]}>Результаты</h3>
      <div className={styles["search-info"]}>
        {searchInput === '' ? <p>начните поиск</p> : null}
      </div>
      {users.length > 0 && (
        <div>
          {users.map((user) => (
            <div
              key={user.id}
              className={styles["result-user"]}
              onClick={() => userSelected(user)}
            >
              <img className={styles["result-image"]} src={UserImage} alt="image" />
              <div className={`${styles["result-info"]} ${currentUser === user ? styles["selected"] : ''}`}>
                <p className={styles["result-name"]}>{user.name}</p>
                <p className={styles["result-email"]}>{user.email}</p>
              </div>
            </div>
          ))}
        </div>
      )
      }
      {
        searchInput && !loading && users.length === 0 && (
          <p className={styles["search-info"]}>ничего не найдено</p>
        )
      }
      {loading && <Loader />}
      {error && <div>{error}</div>}
    </div >
  );
};

export default UserProfile;
