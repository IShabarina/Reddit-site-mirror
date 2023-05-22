import React from 'react';
import styles from './commentsblock.css';
import { Comment } from '../Comment';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/initialState';
import { ICommentsData } from '../../redux/commentsData/actions';

export function CommentsBlock() {
  const commentsDataList = useSelector<RootState, Array<ICommentsData>>(state => state.commentsData.data);
  const loading = useSelector<RootState, boolean>(state => state.commentsData.loading);

  return (
    <div className={styles.container}>
      <div className={styles.sortBlock}>
        <span>Сортировать по:</span>
        <button>Лучшие</button>
      </div>

      {(loading) ? (<span>Loading...</span>) : (
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
      )
      }

    </div>
  );
}
