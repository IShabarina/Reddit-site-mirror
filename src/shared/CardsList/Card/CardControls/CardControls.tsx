import React from 'react';
import styles from './cardcontrols.css';

interface ICardControlProps {
  children?: React.ReactNode;
}

export function CardControls({ children }: ICardControlProps) {
  return (
    <div className={styles.controls}>
      {children}
    </div>
  );
}
