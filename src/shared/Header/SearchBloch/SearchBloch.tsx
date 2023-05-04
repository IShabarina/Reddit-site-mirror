import React, { useContext } from 'react';
import { UserBlock } from '../UserBlock';
import styles from './searchbloch.css';
import { useUserData } from '../../../hooks/useUserData';
import { userContext } from '../../context/userContext';

// interface ISearchBlockProp {
//   // children?: React.ReactNode;
//   token: string;
// }

export function SearchBloch() {
  const { iconImg, name } = useContext(userContext)

  return (
    <div className={styles.searchBloch}>
      <UserBlock avatarSrc={iconImg} username={name} />
    </div>
  );
}
