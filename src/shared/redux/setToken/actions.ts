import { ActionCreator, AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../initialState";


export const SET_TOKEN = 'SET_TOKEN';
export type SetTokenAction = {
    type: typeof SET_TOKEN;
    token: string
}

export const setToken: ActionCreator<SetTokenAction> = (token:string) => ({
    type: SET_TOKEN,
    token,
})

//thunk fn
export function saveToken(): ThunkAction<void, RootState, unknown, AnyAction> {
    return (dispatch) => {
        const token = window.__token__ || localStorage.getItem('token');
        dispatch(setToken(token));
        if (token) {
            localStorage.setItem('token', token);
        }
    }
}



