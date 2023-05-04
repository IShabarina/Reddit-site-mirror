import React, { FormEvent, useEffect, useRef, useState } from 'react';
import styles from './commentformuncontrol.css';

interface ICommentFormProps {
  name?: string;
}

export function CommentFormUncontrol(props: ICommentFormProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);

   // get text from input by Submit: add listener on submit
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    console.log(inputRef.current?.value);
  }

  useEffect(()=>{
    inputRef.current?.focus();
  },[]);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <textarea
        className={styles.input}
        placeholder={`${props.name ? props.name + ',' : ''} оставьте ваш комментарий`}
        ref={inputRef}
        />
      <div className={styles.toolbar}>
        <button type="submit" className={styles.button}>Комментировать</button>
      </div>
    </form>
  );
}
