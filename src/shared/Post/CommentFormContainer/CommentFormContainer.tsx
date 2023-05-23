import React, { ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CommentForm } from '../CommentForm/CommentForm';
import { updateComment } from '../../redux/updateComment/actions';
import { RootState } from '../../redux/initialState';

interface ICommentFormProps {
  name?: string;
}

export function CommentFormContainer(props: ICommentFormProps) {
  // const store = useStore<RootState>(); // из контекста достаем хранилище используя хук Redux 
  // const value = store.getState().commentText; // из хранилища получаем состояние и берем данные и сохраняем в value
  //или получаем при помощи селектора получаем state, получаем нужное нам поле commentText и сохраняем данные в value:
  const value = useSelector<RootState, string>(state => state.commentText);
   const dispatch = useDispatch();

  function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    // в dispatch передаем объект action созданный фун-ей updateComment:
    dispatch(updateComment(event.target.value));
  }

  // get Comment text from input by form Submit:
  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    console.log(value);
  }

  return (
    <CommentForm
      value={value}
      onChange={handleChange}
      onSubmit={handleSubmit} />
  );
}
