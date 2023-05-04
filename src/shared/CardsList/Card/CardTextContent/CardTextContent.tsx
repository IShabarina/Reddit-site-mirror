import React, { useContext, useState } from 'react';
import styles from './cardtextcontent.css';
import { Post } from '../../../Post';
import { postIdContext } from '../../../context/postIdContext';

interface ICardTextContent {
  id: string;
  author: string;
  avatarImg: string;
  title: string;
  datePost: number;
}

export function CardTextContent(postDetails: ICardTextContent) {
  //state for modal Post opens:
  const [isModalOpened, setIsModalOpened] = useState(false);
  //!!! state for Post's ID :
  const { value, onChange } = useContext(postIdContext);

  //src for default avatar:
  const defaultAvatarImg = "https://cdn.dribbble.com/users/759083/screenshots/17196153/media/a437d241c694189e6738c54dcdf9cfd6.jpg";

  //get data of post in format DD Mon YYYY:
  const publishedDate = (dateMS: number) => {
    let dateOfPost = new Date(dateMS * 1000);
    var months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',];
    return (`${dateOfPost.getDate()} ${months[dateOfPost.getMonth()]} ${dateOfPost.getFullYear()}`);
  }

  return (
    <div className={styles.textContent}>

      <div className={styles.metaData}>
        <div className={styles.userLink}>
          <img className={styles.avatar}
            onError={(e) => {
              e.currentTarget.src = defaultAvatarImg;
            }}
            src={postDetails.avatarImg}
            alt="avatar" />
          <a href="#user-url" className={styles.username}>{postDetails.author}</a>
        </div>

        <span className={styles.createdAt}>
          <span className={styles.publishedLabel}>опубликовано </span>
          {publishedDate(postDetails.datePost)}
        </span>
      </div>

      <h2 className={styles.title}>
        <a href="#post-url"
          className={styles.postLink}
          onClick={() => {
            setIsModalOpened(true);
            //!!!=> save Post Id to postIdContext:
            onChange(postDetails.id);
          }}>
          {postDetails.title}
        </a>

        {/* render modal by click on Title: */}
        {isModalOpened && (
          <Post
            id={value}
            onClose={() => { setIsModalOpened(false); }} />
        )}
      </h2>
    </div>
  );
}
