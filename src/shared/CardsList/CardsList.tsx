import React, { useEffect } from 'react';
import { Card } from './Card/Card';
import styles from './cardslist.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/initialState';
import { IPostData, postsDataRequestAsync } from '../redux/postsData/actions';


export function CardsList() {
  const dispatch = useDispatch<any>();
  const token = useSelector<RootState, string>(state => state.token)
  const postsList = useSelector<RootState, Array<IPostData>>(state => state.postsData.data);
  const loading = useSelector<RootState, boolean>(state => state.postsData.loading);

  useEffect(() => {
    if (!token || token === undefined) return;
    dispatch(postsDataRequestAsync());
  }, [token])

  return (
    ((loading) ? (<span> Loading...</span>) : (
      < ul className={styles.cardsList} >
        {
          postsList.map((post) => (
            <Card
              key={post.id}
              id={post.id}
              author={post.author}
              avatarImg={post.avatarImg}
              title={post.title}
              datePost={post.datePost}
              prevImg={post.prevImg}
              rating={post.rating}
              commentsNmb={post.commentsNmb}
            />
          ))
        }
      </ul >
    ))
  );
}

