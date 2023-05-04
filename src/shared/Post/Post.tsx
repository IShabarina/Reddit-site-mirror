import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from './post.css';
import ReactDOM from 'react-dom';
import { CommentForm } from './CommentForm';
import { CommentsBlock } from './CommentsBlock';
import { postIdContext } from '../context/postIdContext';

interface IPost {
  id: string;
  onClose?: () => void;
}

export function Post(props: IPost) {
  const node = document.querySelector('#modal_root');
  if (!node) return null;
  // get link on modal element:
  const ref = useRef<HTMLDivElement>(null);

  //add listener click on document to close modal if clicked out of modal:
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (event.target instanceof Node && !ref.current?.contains(event.target)) {
        props.onClose?.();
      }
    }
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    }
  }, []);

   return ReactDOM.createPortal((
    <div className={styles.modal} ref={ref}>
      <h2>Title</h2>
      <div className={styles.content}>
        <p>Content</p>
      </div>
      <CommentForm />
      <CommentsBlock />
    </div>
  ), node);
}
