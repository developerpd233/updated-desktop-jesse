import { PROFILE_LIST_LOADING,PROFILE_LIST_SUCCESS, PROFILE_LIST_ERROR, PROFILE_CREATE_REQUEST, PROFILE_CREATE_SUCCESS, PROFILE_CREATE_ERROR,
  PROFILE_UPDATE_REQUEST, PROFILE_UPDATE_SUCCESS, PROFILE_UPDATE_ERROR, PROFILE_DELETE_REQUEST, PROFILE_DELETE_SUCCESS, PROFILE_DELETE_ERROR } from '../../constant/ActionTypes/ProfileType'
import { Dispatch } from 'redux'
import { ProfileData } from '../../constant/Interface'
import { baseURL } from '../../constant/url'
import axios from "axios"

export const profileList = () => (dispatch: Dispatch): any => {
  dispatch({ type: PROFILE_LIST_LOADING });
  return axios({
      method: "GET",
      url: `${baseURL}profiles`,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      },
      // params: {
      //     ...(skip || skip === 0 ? { skip: skip } : {}),
      //     ...(page ? { page: page } : {}),
      //     ...(search ? { search: search } : {})
      // }
  }).then((response: any) => {
    return dispatch({ type: PROFILE_LIST_SUCCESS, response: response });
  }).catch((error: any) => {
    if (error.message === "Network Error") {
      return dispatch({ type: PROFILE_LIST_ERROR, response: error.message });
    }
    if (error.response.status === 401) {
      // logout(error.response.data.mesg)
    }
    return dispatch({ type: PROFILE_LIST_ERROR, response: error.response });
  });
}

export const createNewProfile = (obj: ProfileData) => (dispatch: Dispatch): any => {
  dispatch({ type: PROFILE_CREATE_REQUEST });
  let url = `${baseURL}profiles`;
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
    return dispatch({ type: PROFILE_CREATE_SUCCESS, response: response });
  }).catch((error: any) => {
    if (error.message === "Network Error") {
      return dispatch({
          type: PROFILE_CREATE_ERROR,
          response: error.message,
      });
    }
    if (error.response.status === 401) {
      // logout(error.response.data.mesg)
    }
    return dispatch({ type: PROFILE_CREATE_ERROR, response: error });
  });
}

export const getProfileRecord = (id: any)  => (dispatch: Dispatch): any => {
  dispatch({ type: PROFILE_LIST_LOADING });
  var url = `${baseURL}profiles/${id}`
  return axios({
      method: "get",
      url: url,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      },
  }).then((response: any) => {
      return dispatch({ type: PROFILE_LIST_SUCCESS, response: response });
  }).catch((error: any) => {
    if (error.message === "Network Error") {
        return dispatch({
          type: PROFILE_LIST_ERROR,
          response: error.message,
        });
    }
    if (error.message === "Network Error") {
    }
    else if (error.response.status === 401) {
        // dispatch(tokenAuthFailedAction());
    }
    return dispatch({ type: PROFILE_LIST_ERROR, response: error });
  });
}

export const updateProfile = (obj: ProfileData, id: any) => (dispatch: Dispatch): any => {
  dispatch({ type: PROFILE_UPDATE_REQUEST })
  let url = `${baseURL}profiles/${id}`;
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
    return dispatch({ type: PROFILE_UPDATE_SUCCESS, response: response });
  }).catch((error: any) => {
    if (error.message === "Network Error") {
      return dispatch({
        type: PROFILE_UPDATE_ERROR,
        response: error.message,
      });
    }
    if (error.response.status === 401) {
        // logout(error.response.data.mesg)
    }
    return dispatch({ type: PROFILE_UPDATE_ERROR, response: error });
  });
}

export const deleteProfile = (id: any) => (dispatch: Dispatch): any => {
  dispatch({ type: PROFILE_DELETE_REQUEST })
  let url = `${baseURL}profiles/${id}`;
  return axios({
    method: "DELETE",
    url: url,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem('token')}`
    },
  }).then((response: any) => {
    // setCookie(response)
    return dispatch({ type: PROFILE_DELETE_SUCCESS, response: response });
  }).catch((error: any) => {
      if (error.message === "Network Error") {
        return dispatch({
          type: PROFILE_DELETE_ERROR,
          response: error.message,
        });
      }

      if (error.response.status === 401) {
        // logout(error.response.data.mesg)
      }
      return dispatch({ type: PROFILE_DELETE_ERROR, response: error });
  });
}
