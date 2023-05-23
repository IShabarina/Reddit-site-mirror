import { combineReducers } from "redux";
import { userData } from "./userData/reducer";
import { setToken } from "./setToken/reducer";
import { updateComment } from "./updateComment/reducer";
import { commentData } from "./commentsData/reducer";
import { postsData } from "./postsData/reducer";

const rootReducer = combineReducers({
    commentText: updateComment,
    token: setToken,
    userData: userData,
    commentsData: commentData,
    postsData: postsData,
})

export default rootReducer;

