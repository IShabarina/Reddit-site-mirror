import { Reducer } from "redux";
import { CommentTextState, initialState } from "../initialState";
import { UPDATE_COMMENT, UpdateCommentAction } from "./actions";


export const updateComment: Reducer<CommentTextState, UpdateCommentAction> = (state = initialState.commentText, action) => {
    switch (action.type) {
        case UPDATE_COMMENT:
            return  action.text
        default:
            return state;
    }
}