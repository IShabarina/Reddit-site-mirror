import React, { useContext } from 'react';
import { postsContext } from '../context/postsContext';
import { Card } from './Card/Card';
import styles from './cardslist.css';

export function CardsList() {

  const postsList = useContext(postsContext);
  console.log(postsList);

  return (
    <ul className={styles.cardsList}>
      {postsList.map((post) => (
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
      ))}
    </ul>
  );
}
