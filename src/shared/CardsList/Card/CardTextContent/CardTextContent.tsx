import React from 'react';
import styles from './cardtextcontent.css';
import { Post } from '../../../Post';
import { changeDataFormat } from '../../../../utils/react/chargeDataFormat';
import { Link } from 'react-router-dom';

interface ICardTextContent {
  author: string;
  avatarImg: string;
  title: string;
  datePost: number;
  postId: string;
  onClick?: () => void;
}

export function CardTextContent(postDetails: ICardTextContent) {
  const defaultAvatarImg = "https://cdn.dribbble.com/users/759083/screenshots/17196153/media/a437d241c694189e6738c54dcdf9cfd6.jpg";

  return (
    <div className={styles.textContent}>

      <div className={styles.metaData}>
        <div className={styles.userLink}>
          <img className={styles.avatar}
            onError={(e) => {
              e.currentTarget.src = defaultAvatarImg;
            }}
            src={postDetails.avatarImg}
            alt="avatar" />
          <a href="#user-url" className={styles.username}>{postDetails.author}</a>
        </div>

        <span className={styles.createdAt}>
          <span className={styles.publishedLabel}>опубликовано </span>
          {changeDataFormat(postDetails.datePost)}
        </span>
      </div>

      <h2 className={styles.title}>
        <Link
          to={`${postDetails.postId}`}
          className={styles.postLink}
        >
          {postDetails.title}
        </Link>
      </h2>
    </div>
  );
}
