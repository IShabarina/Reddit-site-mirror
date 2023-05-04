import React from "react";
import { usePostsData } from "../../hooks/usePostsData";


export interface IPostContext {
    id: string;
    author: string;
    avatarImg: string;
    datePost: number;
    title: string;
    prevImg: string;
    rating: number;
    commentsNmb: number;
}
// Context for posts data which got from usePostsData: 
export const postsContext = React.createContext<Array<IPostContext>>([]);

// create React component Provider for PostsContext:
export function PostsContextProvider({ children }: { children: React.ReactNode }) {
    //use hook to get posts data
    const postsData = usePostsData();
    return (
        <postsContext.Provider value={postsData}>
            {children}
        </postsContext.Provider>
    )
}
