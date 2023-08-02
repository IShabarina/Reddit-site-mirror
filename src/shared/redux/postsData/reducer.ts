import { Reducer } from "redux";
import { PostsDataState, initialState } from "../initialState";
import { POSTS_DATA_REQUEST, POSTS_DATA_REQUEST_ERROR, POSTS_DATA_REQUEST_SUCCESS, PostsDataRequests, PostsDataSuccessRequest } from "./actions";

export const postsData: Reducer<PostsDataState, PostsDataRequests> = (state = initialState.postsData, action) => {
    switch (action.type) {
        case POSTS_DATA_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case POSTS_DATA_REQUEST_SUCCESS:
            return {
                ...state,
                // data: state.data.concat(action.postsData),
                data: [...state.data, ...action.postsData],
                loading: false,
                after: action.after,
            }
        case POSTS_DATA_REQUEST_ERROR:
            return {
                ...state,
                error: action.error,
                loading: false,
            }
        default:
            return state;
    }
}