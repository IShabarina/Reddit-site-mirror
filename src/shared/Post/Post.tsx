import { useNavigate, useParams } from 'react-router-dom'
import React, { useEffect, useRef, useState } from 'react';
import styles from './post.css';
import ReactDOM from 'react-dom';
import { CommentsBlock } from './CommentsBlock';
import { CommentFormContainer } from './CommentFormContainer';
import { commentsDataRequestAsync } from '../redux/commentsData/actions';
import { RootState } from '../redux/initialState';
import { useDispatch, useSelector } from 'react-redux';
import { IPostData } from '../redux/postsData/actions';

interface IPost {
  id?: string;
}

export function Post(props: IPost) {
  const dispatch = useDispatch<any>();
  const postsList = useSelector<RootState, Array<IPostData>>(state => state.postsData.data);
  const [postObj, setPostObj] = useState({ title: '', image: '', text: '' });
  //adding closing of mobal by using router's hook:
  const navigate = useNavigate();
  const { id } = useParams();
  if (id) {
    dispatch(commentsDataRequestAsync(id));
  }

  const node = document.querySelector('#modal_root');
  if (!node) return null;
  const ref = useRef<HTMLDivElement>(null);// get link on modal element

  useEffect(() => {
    const postData = postsList.filter(item => item.id === id);
    setPostObj({
      title: postData[0].title,
      image: postData[0].prevImg,
      text: '',
    });
    
    //add listener click on document to change URI if clicked out of modal:
    function handleClick(event: MouseEvent) {
      if (event.target instanceof Node && !ref.current?.contains(event.target)) {
        navigate('/');
      }
    }

    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    }
  }, []);

  return ReactDOM.createPortal((
    <div className={styles.modal} ref={ref} onClick={(e) => e.stopPropagation()}>
      <h2>{postObj.title}</h2>
      <div className={styles.content}>
        <img className={styles.image} src={postObj.image} alt='post image' />
        {postObj.text.length > 0 && <p>{postObj.text}</p>}
      </div>
      <CommentFormContainer />
      <CommentsBlock />
    </div>
  ), node);
}


