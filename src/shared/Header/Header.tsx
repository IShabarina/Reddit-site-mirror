import React from 'react';
import styles from './header.css';
import { SearchBloch } from './SearchBloch';
import { SortBlock } from './SortBlock';
import { ThreadTitle } from './ThreadTitle';

// interface IHeaderProps {
//   token: string;
// }

export function Header() {
  // заимпортим tokenContext - забираем token положенный компонентом выше в tokenContext 
  // const { Consumer } = tokenContext;
  // альтернатива Consumer:
  // const token = useContext(tokenContext)

  return (
    <header className={styles.header}>
      <SearchBloch />
      <ThreadTitle />
      <SortBlock />
    </header>
  );
}

