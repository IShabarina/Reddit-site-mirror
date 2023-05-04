import React, { useContext, useEffect } from 'react';
import styles from './commentsblock.css';
import { Comment } from '../Comment';
import { commentsListContext } from '../../context/commentsListContext';

export function CommentsBlock() {
  const commentsDataList = useContext(commentsListContext);
  console.log(commentsDataList);

  return (
    <div className={styles.container}>
      <div className={styles.sortBlock}>
        <span>Сортировать по:</span>
        <button>Лучшие</button>
      </div>

      <ul className={styles.commentsList}>
        {commentsDataList.map((comment) => (
          <Comment
            key={comment.id}
            userName={comment.userName}
            dated={comment.dated}
            text={comment.text}
            replies={comment.replies}
          />
        ))}
      </ul>
    </div>
  );
}
