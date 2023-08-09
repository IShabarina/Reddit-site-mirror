import React, { ChangeEvent, FormEvent } from 'react';
import { CommentForm, IFormData } from '../CommentForm/CommentForm';
import { SubmitHandler } from 'react-hook-form';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ICommentFormProps {
  name?: string;
}
interface CommentStore {
  commentText: string,
  updateCommentText: (text: string) => void,
}

const useCommentStore = create<CommentStore>()(
  devtools(
    (set) => ({
      commentText: 'Hi from Zustand!',
      updateCommentText: (newCommentText) => set((state) => ({ commentText: newCommentText })),
    }),
    {
      name: "CommentStore"
    })
)

export function CommentFormContainer(props: ICommentFormProps) {
  const { commentText, updateCommentText } = useCommentStore();

  function handlerChange(event: ChangeEvent<HTMLTextAreaElement>) {
    updateCommentText(event.target.value);
  }

  const handlerSubmit: SubmitHandler<IFormData> = (data) => {
    updateCommentText('');
    console.log('CommentText:', JSON.stringify(data.commentText));
  }

  return (
    <CommentForm
      value={commentText}
      onChange={handlerChange}
      onSubmit={handlerSubmit}
    />
  );
}
