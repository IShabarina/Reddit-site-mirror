import React, { ChangeEvent, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CommentForm, IFormData } from '../CommentForm/CommentForm';
import { updateComment } from '../../redux/updateComment/actions';
import { RootState } from '../../redux/initialState';
import { SubmitHandler } from 'react-hook-form';

interface ICommentFormProps {
  name?: string;
}

export function CommentFormContainer(props: ICommentFormProps) {
  // const store = useStore<RootState>(); // из контекста достаем хранилище используя хук Redux 
  // const value = store.getState().commentText; // из хранилища получаем состояние и берем данные и сохраняем в value
  //или получаем при помощи селектора получаем state, получаем нужное нам поле commentText и сохраняем данные в value:
  const value = useSelector<RootState, string>(state => state.commentText);
  const dispatch = useDispatch();

  function handlerChange(event: ChangeEvent<HTMLTextAreaElement> )  {
    // в dispatch передаем объект action созданный фун-ей updateComment:
    dispatch(updateComment(event.target.value));
  }

  const handlerSubmit: SubmitHandler<IFormData> = (data) => {
    dispatch(updateComment(''));
    console.log('CommentText:', JSON.stringify(data.commentText));
  }

  return (
    <CommentForm
      value={value}
      onChange={handlerChange}
      onSubmit={handlerSubmit}
    />
  );
}
