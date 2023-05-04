import React from 'react';
import styles from './cardpreview.css';

interface ICardPreview {
  src: string;
}

export function CardPreview(prop: ICardPreview) {
 
  return (
    <div className={styles.preview}>
      <img className={styles.previewImg}
        src={prop.src}
        alt="preview" />
    </div>
  );

}
