import React, { useEffect, useRef} from 'react';
import styles from './post.css';
import ReactDOM from 'react-dom';
import { CommentsBlock } from './CommentsBlock';
import { CommentFormContainer } from './CommentFormContainer';

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
      <CommentFormContainer />
      <CommentsBlock />
    </div>
  ), node);
}
