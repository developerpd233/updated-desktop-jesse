import { SETTING_LIST_LOADING,SETTING_LIST_SUCCESS, SETTING_LIST_ERROR,
    SETTING_UPDATE_REQUEST, SETTING_UPDATE_SUCCESS, SETTING_UPDATE_ERROR } from '../../constant/ActionTypes/SettingType';
import { Dispatch } from 'redux'
import { SettingeData } from '../../constant/Interface'
import { baseURL } from '../../constant/url'
import axios from "axios";


export const getProfileRecord = ()  => (dispatch: Dispatch): any => {
    dispatch({ type: SETTING_LIST_LOADING });
    var url = `${baseURL}users/authuser`
    return axios({
        method: "get",
        url: url,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        },
    }).then((response: any) => {
        return dispatch({ type: SETTING_LIST_SUCCESS, response: response });
    }).catch((error: any) => {
      if (error.message === "Network Error") {
          return dispatch({
            type: SETTING_LIST_ERROR,
            response: error.message,
          });
      }
      if (error.message === "Network Error") {
      }
      else if (error.response.status === 401) {
          // dispatch(tokenAuthFailedAction());
      }
      return dispatch({ type: SETTING_LIST_ERROR, response: error });
    });
  }


  export const updateProfile = (obj: SettingeData) => (dispatch: Dispatch): any => {
    dispatch({ type: SETTING_UPDATE_REQUEST })
    let url = `${baseURL}users/1`;
    return axios({
      method: "POST",
      url: url,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      },
      data: obj,
    }).then((response: any) => {
      // setCookie(response)
      console.log('response', response)
      return dispatch({ type: SETTING_UPDATE_SUCCESS, response: response });
    }).catch((error: any) => {
      if (error.message === "Network Error") {
        return dispatch({
          type: SETTING_UPDATE_ERROR,
          response: error.message,
        });
      }
      if (error.response.status === 401) {
          // logout(error.response.data.mesg)
      }
      return dispatch({ type: SETTING_UPDATE_ERROR, response: error });
    });
  }