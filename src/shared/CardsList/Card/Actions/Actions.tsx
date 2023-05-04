import React from 'react';
import styles from './actions.css';

interface IActionsProps {
  children?: React.ReactNode;
}

export function Actions({children}: IActionsProps) {
  return (
    <div className={styles.actions}>
      { children }
    </div>
  );
}
