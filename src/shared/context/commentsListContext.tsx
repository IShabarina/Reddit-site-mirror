import React, { useCallback, useContext } from "react";
import { useCommentsData } from "../../hooks/useCommentsData";
import { postIdContext } from "./postIdContext";

export interface IPostContext {
    id: string;
    userName: string;
    dated: number;
    text: string;
    replies?: Array<IPostContext>
}

export const commentsListContext = React.createContext<Array<IPostContext>>([]);

export function CommentsListContextProvider({ children }: { children: React.ReactNode }) {

    const { value, onChange } = useContext(postIdContext);
    console.log('post ID using in context', value);
    const commentsList = useCommentsData(value);
           return (
        <commentsListContext.Provider value={commentsList}>
            {children}
        </commentsListContext.Provider>
    )
}