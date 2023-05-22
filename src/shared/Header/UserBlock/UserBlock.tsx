import React from 'react';
import { EIconsComponent, Icon } from '../../Icon';
import styles from './userblock.css';

interface UserBlockProps {
  avatarSrc?: string;
  username?: string;
  loading?: boolean;
}

export function UserBlock({ avatarSrc, username, loading }: UserBlockProps) {
  return (
    <a
      href="https://www.reddit.com/api/v1/authorize?client_id=CYZM5_FaTRn214QMXb0URg&response_type=code&state=random_string&redirect_uri=http://localhost:3000/auth&duration=permanent&scope=read submit identity"
      className={styles.userBox}
    >
      <div className={styles.avatarBox}>
        {avatarSrc
          ? <img src={avatarSrc} alt="user avatar" className={styles.avatarImage} />
          : <Icon name={EIconsComponent.anon} />
        }
      </div>

      <div className={styles.username}>
        {loading ? (
          <span className={styles.username_text} > Loading...</span>
        ) : (
          <span className={styles.username_text} >{username || 'Aноним'}</span>
        )}
      </div>
    </a>
  );
}
