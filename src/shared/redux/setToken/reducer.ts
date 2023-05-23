import { Reducer } from "react";
import { SET_TOKEN, SetTokenAction } from "./actions";
import { TokenState, initialState } from "../initialState";


export const setToken: Reducer<TokenState, SetTokenAction> = (state = initialState.token, action) => {
    switch (action.type) {
        case SET_TOKEN:
            return action.token
        default:
            return state;
    }
}