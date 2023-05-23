import { Reducer } from "react";
import { COMMENTS_DATA_REQUEST, COMMENTS_DATA_SUCCESS, CommentsDataSuccessAction } from "./actions";
import { CommentsDataState, initialState } from "../initialState";
import { AnyAction } from "redux";

export const commentData: Reducer<CommentsDataState, AnyAction> = (state = initialState.commentsData, action) => {
    switch (action.type) {
        case COMMENTS_DATA_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case COMMENTS_DATA_SUCCESS:
            return {
                ...state,
                data: action.commentsData,
                loading: false,
            }
        default:
            return state;
    }
}
