import { ThunkAction } from "redux-thunk";
import { RootState } from "../initialState";
import { ActionCreator, AnyAction } from "redux";
import axios from "axios";

export interface IPostData {
    id: string;
    author: string;
    avatarImg: string;
    title: string;
    rating: number;
    prevImg: string;
    datePost: number;
    commentsNmb: number;
}

export const POSTS_DATA_REQUEST = 'POSTS_DATA_REQUEST';
export const POSTS_DATA_REQUEST_SUCCESS = 'POSTS_DATA_REQUEST_SUCCESS';
export const POSTS_DATA_REQUEST_ERROR = 'POSTS_DATA_REQUEST_ERROR';

export type PostsDataRequest = {
    type: typeof POSTS_DATA_REQUEST;
}
export type PostsDataSuccessRequest = {
    type: typeof POSTS_DATA_REQUEST_SUCCESS;
    postsData: Array<IPostData>;
    after: string;
}
export type PostsDataErrorRequest = {
    type: typeof POSTS_DATA_REQUEST_ERROR;
    error: string;
}

export type PostsDataRequests = PostsDataRequest | PostsDataSuccessRequest | PostsDataErrorRequest;

export const postsDataRequest: ActionCreator<PostsDataRequest> = () => ({
    type: POSTS_DATA_REQUEST
});
export const postsDataSuccessRequest: ActionCreator<PostsDataSuccessRequest> = (postsData: Array<IPostData>, after: string) => ({
    type: POSTS_DATA_REQUEST_SUCCESS,
    postsData,
    after,
});
export const postsDataErrorRequest: ActionCreator<PostsDataErrorRequest> = (error: string) => ({
    type: POSTS_DATA_REQUEST_ERROR,
    error,
});

export function postsDataRequestAsync(): ThunkAction<void, RootState, unknown, AnyAction> {
    return (dispatch, getState) => {
        dispatch(postsDataRequest());
        if (!getState().token || getState().token === "undefined" || getState().token === '') return;
        axios.get('https://oauth.reddit.com/best.json?sr_detail=true',
            {
                headers: { Authorization: `bearer ${getState().token}` },
                params: {
                    limit: 2,
                    after: getState().postsData.after,
                }
            })
            .then((res) => {
                const after: string = res.data.data.after;
                const postsData: Array<IPostData> = res.data.data.children.map(
                    (item: { data: any }) => ({
                        id: item.data.id,
                        author: item.data.author,
                        avatarImg: item.data.sr_detail.icon_img,
                        title: item.data.title,
                        datePost: item.data.created_utc,
                        prevImg: item.data.preview
                            ? item.data.preview.images?.[0].source.url.replace(
                                /(\&amp\;)/g,
                                "&"
                            )
                            : "https://b.thumbs.redditmedia.com/PXt8GnqdYu-9lgzb3iesJBLN21bXExRV1A45zdw4sYE.png",
                        rating: item.data.ups,
                        commentsNmb: item.data.num_comments,
                    })
                );
                console.log("newData", res.data.data);
                console.log("newafter", after);
                dispatch(postsDataSuccessRequest([...getState().postsData.data, ...postsData], after));
            })
            .catch((error) => {
                dispatch(postsDataErrorRequest(error));
            })
    }
}