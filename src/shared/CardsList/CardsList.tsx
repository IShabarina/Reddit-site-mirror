import React, { useEffect, useRef, useState } from 'react';
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
  const nextAfter = useSelector<RootState, string>(state => state.postsData.after);

  const bottomOfList = useRef<HTMLDivElement>(null); //link on div element at the and of list
  const [loadMorePosts, setloadMorePosts] = useState(true);

  // useEffect(() => {
  //   if (!token || token === undefined) return;
  //   // dispatch(postsDataRequestAsync());
  // }, [token])

  function handleBtnClick() {
    setloadMorePosts(true);
  }

  useEffect(() => {
    if (!token || token === undefined) return;
    
    //удалить (временно тест):
    if (postsList.length >= 6) {
      setloadMorePosts(false);
    };
    if (!loadMorePosts) return;

    //add observer:
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        console.log('posts From Redux', postsList);
        console.log('after from Redux', nextAfter);
        dispatch(postsDataRequestAsync());
      }
    }, {
      rootMargin: '10px',
    });

    if (bottomOfList.current) {
      observer.observe(bottomOfList.current);
    }
    return () => {
      if (bottomOfList.current) {
        observer.unobserve(bottomOfList.current);
      }
    }
  }, [bottomOfList.current, nextAfter, token, loadMorePosts]);

  return (
    <>
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
        <div ref={bottomOfList} />
      </ul >
      {loading && (<div style={{ padding: '40px', textAlign: 'center' }}> Loading...</div>)}
      <button className={styles.button} onClick={handleBtnClick}>Загрузить еще</button>
    </>

  );
}

