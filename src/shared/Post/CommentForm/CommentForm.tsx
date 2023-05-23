import React, { ChangeEvent, FormEvent } from 'react';
import styles from './commentform.css';

// controlled Comment form:

interface ICommentFormProps {
  name?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (event: FormEvent) => void;
}

export function CommentForm({ name, value, onChange, onSubmit }: ICommentFormProps) {

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <textarea
        className={styles.input}
        placeholder={`${name ? name + ',' : ''} оставьте ваш комментарий`}
        value={value}
        onChange={onChange} />
      <div className={styles.toolbar}>
        <button type="submit" className={styles.button}>Комментировать</button>
      </div>
    </form>
  );
}
