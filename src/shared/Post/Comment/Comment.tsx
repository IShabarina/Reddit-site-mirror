import React, { useEffect, useState } from 'react';
import styles from './comment.css';
import { EIconsComponent, Icon } from '../../Icon';
import { PostMenu } from '../PostMenu';
import { ICommentsData } from '../../redux/commentsData/actions';

interface IComment {
  key: string;
  userName: string;
  dated: number;
  text: string;
  replies?: any
}

export function Comment(props: IComment) {
  const userAvatarSrc = "https://cdn.dribbble.com/users/759083/screenshots/17196153/media/a437d241c694189e6738c54dcdf9cfd6.jpg"

  return (
    <div className={styles.commentItem}>
      <div className={styles.leftBar}>
        <button className={styles.up}>
          <Icon name={EIconsComponent.up} />
        </button>
        <button className={styles.down}>
          <Icon name={EIconsComponent.down} />
        </button>
        <span />
      </div>

      <div className={styles.content}>
        <div className={styles.title}>
          <div className={styles.userLink}>
            <img className={styles.avatar}
              src={userAvatarSrc}
              alt="avatar" />
            <a href="#user-url" className={styles.username}>{props.userName}</a>
          </div>
          <span className={styles.createdAt}>{props.dated}</span>
          <span className={styles.userGroup}>Лига юристов</span>
        </div>
        <p className={styles.text}>{props.text}</p>

        <PostMenu userName={props.userName} />

        {(props.replies && props.replies !== "") && props.replies.map((item: ICommentsData) =>
          <Comment
            key={item.id}
            userName={item.userName}
            dated={item.dated}
            text={item.text}
            replies={item.replies}
          />)}
      </div>
    </div>
  );
}
