import { ActionCreator, AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../initialState";
import rootReducer from "../rootReducer";
import { useDispatch } from "react-redux";


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
// export function saveToken(): ThunkAction<void, RootState, unknown, AnyAction> {
//     return (dispatch) => {
//         const toke                                                                                                                                       n = window.__token__ || localStorage.getItem('token');
//         dispatch(setToken(token));
//         if (token) {
//             localStorage.setItem('token', token);
//         }
//     }
// }

export function saveToken() {
    const token = window.__token__ || localStorage.getItem('token');
    if (token) {
        localStorage.setItem('token', token);
    }
    return setToken(token);
}



