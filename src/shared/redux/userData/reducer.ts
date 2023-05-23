import { Reducer } from "react";
import { USER_DATA_REQUEST, USER_DATA_REQUEST_ERROR, USER_DATA_REQUEST_SUCCESS, UserDataActions } from "./actions";
import { UserDataState, initialState } from "../initialState";


export const userData: Reducer<UserDataState, UserDataActions> = (state  = initialState.userData, action) => {
    switch (action.type) {
        case USER_DATA_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case USER_DATA_REQUEST_ERROR:
            return {
                ...state,
                error: action.error,
                loading: false,
            }
        case USER_DATA_REQUEST_SUCCESS:
            return {
                ...state,
                data: action.data,
                loading: false,
            }
        default:
            return state;
    }
}