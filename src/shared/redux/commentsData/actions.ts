
import axios from "axios";
import { ActionCreator, AnyAction } from "redux";
import { ThunkAction} from "redux-thunk";
import { RootState } from "../initialState";


export interface ICommentsData {
    id: string;
    userName: string;
    dated: number;
    text: string;
    replies?: any;
}

export const COMMENTS_DATA_SUCCESS = 'COMMENTS_DATA_SUCCESS';
export const COMMENTS_DATA_REQUEST = 'COMMENTS_DATA_REQUEST';
export type CommentsDataSuccessAction = {
    type: typeof COMMENTS_DATA_SUCCESS;
    commentsData: Array<ICommentsData>;
}
export type CommentsDataRequest = {
    type: typeof COMMENTS_DATA_REQUEST;
}

//action-creater
export const commentsDataSuccessRequest: ActionCreator<CommentsDataSuccessAction> = (commentsData: Array<ICommentsData>) => ({
    type: COMMENTS_DATA_SUCCESS,
    commentsData,
});

export const commentsDataRequest: ActionCreator<CommentsDataRequest> = () => ({
    type: COMMENTS_DATA_REQUEST,
});


//fn for recursive algorithm
function mapComments(redditDataArray: Array<any>): Array<ICommentsData> {
    return redditDataArray.map((item: { data: any }) => ({
        id: item.data.id,
        userName: item.data.author,
        dated: item.data.created_utc,
        text: item.data.body,
        replies: (item.data.replies && item.data.replies !== "")
            ? mapComments(item.data.replies.data.children.filter((child: { kind: string; }) => child.kind == 't1'))
            : "",
    }));
}

//thunk fn
export function commentsDataRequestAsync(id:string): ThunkAction<void, RootState, unknown, AnyAction> {
     return (dispatch, getState) => {
        dispatch(commentsDataRequest());
        axios.get(`https://oauth.reddit.com/comments/${id}`, {
            headers: { Authorization: `bearer ${getState().token}` }
        })
            .then((res) => {
                const comments: Array<ICommentsData> = mapComments(res.data.data.children);
                dispatch(commentsDataSuccessRequest(comments));
            })
            .catch(e => {
                console.log(e)
            }
            )
    }
}