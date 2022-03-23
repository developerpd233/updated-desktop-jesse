import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR } from '../../constant/ActionTypes/LoginType'
import { Dispatch } from 'redux'
import { baseURL } from '../../constant/url'
import axios from 'axios'


export const userLogin = (data: object) => (dispatch: Dispatch): any => {
  dispatch({ type: LOGIN_REQUEST })
  return axios({
    method: "POST",
    url: `${baseURL}login`,
    headers: {
        Accept: "application/json",
    },
    data: data
  }).then((response: any) => {
    return dispatch({ type: LOGIN_SUCCESS, response: response });
})
.catch((error: any) => {
    if (error.message === "Network Error") {
        return dispatch({ type: LOGIN_ERROR, response: error.message });
    }
    if (error.response.status === 400) {
        // dispatch(tokenAuthFailedAction());
    }
    return dispatch({ type: LOGIN_ERROR, response: error.response });
})
}
