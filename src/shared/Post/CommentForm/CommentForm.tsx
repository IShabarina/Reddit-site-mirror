import React, { ChangeEvent, FormEvent } from 'react';
import styles from './commentform.css';
import { useForm } from 'react-hook-form';

// controlled Comment form + react-hook-form:
interface ICommentFormProps {
  name?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (data: IFormData) => void;
}
export interface IFormData {
  commentText: string
}

export function CommentForm({ name, value, onChange, onSubmit }: ICommentFormProps) {
  
  const {  //use hook useForm to control state of form and validate:
    register, // match elements of Form with state of libriary 
    formState: { errors, isValid, isSubmitSuccessful },  //errors object and block submit btn
    handleSubmit, // wrapper for our submit fn
    reset, //  clear form after submit
  } = useForm<IFormData>({
    mode: "onChange", //validation is triggered on the change input
    defaultValues: {
      commentText: value,
    },
  });

  React.useEffect(() => { //clear field CommentText to '':
    if (isSubmitSuccessful) { reset({ commentText: '' }) }
  }, [isSubmitSuccessful, reset]);

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(onSubmit)}>

      <textarea
        className={styles.input}
        placeholder={`${name ? name + ',' : ''} оставьте ваш комментарий`}
        {...register('commentText', { //1st - associate form flield, 2nd- object of options
          required: 'Please enter a comment text...',
          minLength: {
            value: 2,
            message: 'Please enter more than 2 characters...'
          },
          onChange: (e) => { onChange(e) }, //use prop 'onChange' to dispatch value of Comment text to state
        })}
        aria-invalid={errors?.commentText ? "true" : "false"}
      />

      <div className={styles.toolbar}>
        <button type="submit" className={styles.button} disabled={!isValid}>
          Комментировать
        </button>
      </div>

      <div style={{ height: 30, padding: 5, fontSize: 12 }}>
        {errors?.commentText &&
          <p style={{ color: '#CC6633' }}>{errors?.commentText?.message || "Error!"}</p>}
      </div>
    </form>
  );
}
