import React, { useState } from 'react';
import styles from './card.css';
import { CardControls } from './CardControls';
import { CardPreview } from './CardPreview';
import { CardTextContent } from './CardTextContent';
import { KarmaCounter } from './KarmaCounter';
import { Comments } from './Comments';
import { Actions } from './Actions';
import { Menu } from './Menu';
import { ShareBtn } from './ShareBtn';
import { SaveBtn } from './SaveBtn';
import { IPostData } from '../../redux/postsData/actions';


export function Card(postDetails: IPostData) {
  const [postId, setPostId] = useState('');

  function handlerPostClick() {
    setPostId(postDetails.id);
  }

  return (
    <li key={postDetails.id} className={styles.card}>
      <CardTextContent
        author={postDetails.author}
        avatarImg={postDetails.avatarImg}
        title={postDetails.title}
        datePost={postDetails.datePost}
        onClick={() => {
          handlerPostClick();
        }}
        postId={postId}
      />

      <CardPreview src={postDetails.prevImg} />

      <Menu />
      <CardControls>
        <KarmaCounter counter={postDetails.rating} />
        <Comments value={postDetails.commentsNmb} />
        <Actions>
          <ShareBtn />
          <SaveBtn />
        </Actions>
      </CardControls>
    </li>
  );
}

