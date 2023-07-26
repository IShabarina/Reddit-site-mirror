import { ICommentsData } from "./commentsData/actions";
import { IPostData } from "./postsData/actions";

//type of our main state:
export type RootState = {
    token: TokenState;
    userData: UserDataState,
    postsData: PostsDataState,
    commentsData: CommentsDataState,
    commentText: CommentTextState;
}

//fill in main state by initial value:
export const initialState: RootState = {
    token: '',
    userData: {
        loading: false,
        error: '',
        data: {}
    },
    commentsData: {
        loading: false,
        data: []
    },
    postsData: {
        loading: false,
        error: '',
        data: [],
        after: '',
    },
    commentText: '',
}

//types of another slice states:
export type TokenState = string;
export type UserDataState = {
    loading: boolean,
    error: string,
    data: {}
}
export type PostsDataState = {
    loading: boolean,
    error: string,
    data: Array<IPostData>,
    after: string,
}
export type CommentsDataState = {
    loading: boolean,
    data: Array<ICommentsData>
}
export type CommentTextState = string;
