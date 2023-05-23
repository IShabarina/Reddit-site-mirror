import { ActionCreator} from "redux";

export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export type UpdateCommentAction = {
    type: typeof UPDATE_COMMENT;
    text: string
}

export const updateComment: ActionCreator<UpdateCommentAction> = (text) => ({
    type: UPDATE_COMMENT,
    text,
})