
import axios from "axios";
import { RootState } from "../initialState";
import { ActionCreator, AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";

export const USER_DATA_REQUEST = 'USER_DATA_REQUEST';
export const USER_DATA_REQUEST_SUCCESS = 'USER_DATA_REQUEST_SUCCESS';
export const USER_DATA_REQUEST_ERROR = 'USER_DATA_REQUEST_ERROR';

export interface IUserData {
    name?: string;
    iconImg?: string;
}
// types of actions are returned  by action-creaters:
export type UserDataRequestAction = {
    type: typeof USER_DATA_REQUEST;
}
export type UserDataRequestSuccessAction = {
    type: typeof USER_DATA_REQUEST_SUCCESS;
    data: IUserData;
}
export type UserDataRequestErrorAction = {
    type: typeof USER_DATA_REQUEST_ERROR;
    error: string;
}

export type UserDataActions =
    | UserDataRequestAction
    | UserDataRequestSuccessAction
    | UserDataRequestErrorAction;

//action-createers:
export const userDataRequest: ActionCreator<UserDataRequestAction> = () => ({
    type: USER_DATA_REQUEST,
});
export const userDataSuccessRequest: ActionCreator<UserDataRequestSuccessAction> = (data: IUserData) => ({
    type: USER_DATA_REQUEST_SUCCESS,
    data,
});
export const userDataErrorRequest: ActionCreator<UserDataRequestErrorAction> = (error: string) => ({
    type: USER_DATA_REQUEST_ERROR,
    error,
});


//action creator - fn returned by thunk
export function userDataRequestAsync(): ThunkAction<void, RootState, unknown, AnyAction> {
    return (dispatch, getState) => {
        dispatch(userDataRequest());
        if (!getState().token || getState().token === "undefined" || getState().token === '') return;
        axios.get('https://oauth.reddit.com/api/v1/me.json', {
            headers: { Authorization: `bearer ${getState().token}` }
        })
            .then((resp) => {
                const userData = resp.data;
                const myUserData = {
                    name: userData.name,
                    iconImg: userData.icon_img.split('?')[0]
                };
                dispatch(userDataSuccessRequest(myUserData));
            })
            .catch((error) => {
                console.log(error);
                dispatch(userDataErrorRequest(String(error)))
            })
    }
}
