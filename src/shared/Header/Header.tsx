import React from 'react';
import styles from './header.css';
import { SearchBloch } from './SearchBloch';
import { SortBlock } from './SortBlock';
import { ThreadTitle } from './ThreadTitle';

export function Header() {

  return (
    <header className={styles.header}>
      <SearchBloch />
      <ThreadTitle />
      <SortBlock />
    </header>
  );
}

