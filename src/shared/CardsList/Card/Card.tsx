import React from 'react';
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

interface IPostData {
  id: string;
  author: string;
  avatarImg: string;
  title: string;
  datePost: number;
  prevImg: string;
  rating: number;
  commentsNmb: number;
}

export function Card(postDetails: IPostData) {

  return (
    <li key={postDetails.id} className={styles.card}>
      <CardTextContent
        id={postDetails.id}
        author={postDetails.author}
        avatarImg={postDetails.avatarImg}
        title={postDetails.title}
        datePost={postDetails.datePost} />

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

