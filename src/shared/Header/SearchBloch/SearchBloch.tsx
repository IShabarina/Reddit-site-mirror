import { UserBlock } from '../UserBlock';
import styles from './searchbloch.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IUserData, userDataRequestAsync } from '../../redux/userData/actions';
import { RootState } from '../../redux/initialState';

export function SearchBloch() {
  const dispatch = useDispatch<any>();
  const token = useSelector<RootState, string>(state => state.token);
  const user = useSelector<RootState, IUserData>(state => state.userData.data);
  const loading = useSelector<RootState, boolean> (state => state.userData.loading);

  useEffect(() => {
    if (!token) return;
    dispatch(userDataRequestAsync());
  }, [token])

  return (
    <div className={styles.searchBloch}>
      <UserBlock avatarSrc={user.iconImg} username={user.name} loading={loading}/>
    </div>
  );
}


