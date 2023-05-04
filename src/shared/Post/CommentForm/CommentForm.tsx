import React, { ChangeEvent, FormEvent, useContext, useRef, useState } from 'react';
import styles from './commentform.css';
import { commentContext } from '../../context/commentContext';

// controlled Comment form:

interface ICommentFormProps {
  name?: string;
}

export function CommentForm(props: ICommentFormProps) {
  // state for object Comment text and fn of set Comment text:
  const { value, onChange } = useContext(commentContext);

  // change Comment text in state:
  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    onChange(event.target.value);
  }

  // get Comment text from input by form Submit:
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    console.log(value);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <textarea
        className={styles.input}
        placeholder={`${props.name ? props.name + ',' : ''} оставьте ваш комментарий`}
        value={value}
        onChange={handleChange} />
      <div className={styles.toolbar}>
        <button type="submit" className={styles.button}>Комментировать</button>
      </div>
    </form>
  );
}
