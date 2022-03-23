import {TASK_LIST_LOADING, TASK_LIST_SUCCESS, TASK_LIST_ERROR, TASK_CREATE_REQUEST, TASK_CREATE_SUCCESS, TASK_CREATE_ERROR,
TASK_UPDATE_REQUEST, TASK_UPDATE_SUCCESS, TASK_UPDATE_ERROR , TASK_DELETE_REQUEST, TASK_DELETE_SUCCESS, TASK_DELETE_ERROR} from '../../constant/ActionTypes/TaskType'
import { Dispatch } from 'redux'
import {TaskData} from '../../constant/Interface'
import { baseURL } from '../../constant/url'

const axios = require("axios")


export const taskList = () => (dispatch: Dispatch): any => {
  console.log('token 11', sessionStorage.getItem('token'))
  dispatch({ type: TASK_LIST_LOADING });
  return axios({
    method: "GET",
    url: `${baseURL}tasks`,
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
    // setCookie(response)
    return dispatch({ type: TASK_LIST_SUCCESS, response: response });
  }).catch((error: any) => {
    if (error.message === "Network Error") {
        return dispatch({ type: TASK_LIST_ERROR, response: error.message });
    }
    if (error.response.status === 401) {
        // logout(error.response.data.mesg)
    }
    return dispatch({ type: TASK_LIST_ERROR, response: error.response });
  });
}

export const createNewTask = (obj: TaskData) => (dispatch: Dispatch): any => {
  dispatch({ type: TASK_CREATE_REQUEST });
  let url = `${baseURL}tasks`;
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
    return dispatch({ type: TASK_CREATE_SUCCESS, response: response });
  }).catch((error: any) => {
    if (error.message === "Network Error") {
      return dispatch({
        type: TASK_CREATE_ERROR,
        response: error.message,
      });
    }
    if (error.response.status === 401) {
      // logout(error.response.data.mesg)
    }
    return dispatch({ type: TASK_CREATE_ERROR, response: error });
  });
}

export const getTaskRecord = (id: any)  => (dispatch: Dispatch): any => {
  dispatch({ type: TASK_LIST_LOADING });
  var url = `${baseURL}tasks/${id}`
  return axios({
    method: "get",
    url: url,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem('token')}`
    },
  }).then((response: any) => {
      return dispatch({ type: TASK_LIST_SUCCESS, response: response });
  }).catch((error: any) => {
    if (error.message === "Network Error") {
      return dispatch({
        type: TASK_LIST_ERROR,
        response: error.message,
      });
    }
    if (error.message === "Network Error") {
    }
    else if (error.response.status === 401) {
      // dispatch(tokenAuthFailedAction());
    }
    return dispatch({ type: TASK_LIST_ERROR, response: error });
  });
}

export const updateTask = (obj: TaskData, id: any) => (dispatch: Dispatch): any => {
  dispatch({ type: TASK_UPDATE_REQUEST })
  let url = `${baseURL}tasks/${id}`;
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
    return dispatch({ type: TASK_UPDATE_SUCCESS, response: response });
  }).catch((error: any) => {
    if (error.message === "Network Error") {
      return dispatch({
        type: TASK_UPDATE_ERROR,
        response: error.message,
      });
    }
    if (error.response.status === 401) {
        // logout(error.response.data.mesg)
    }
    return dispatch({ type: TASK_UPDATE_ERROR, response: error });
  });
}

export const deleteTask = (id: any) => (dispatch: Dispatch): any => {
  dispatch({ type: TASK_DELETE_REQUEST })
  let url = `${baseURL}tasks/${id}`;
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
    return dispatch({ type: TASK_DELETE_SUCCESS, response: response });
  }).catch((error: any) => {
    if (error.message === "Network Error") {
      return dispatch({
        type: TASK_DELETE_ERROR,
        response: error.message,
      });
    }
    if (error.response.status === 401) {
      // logout(error.response.data.mesg)
    }
    return dispatch({ type: TASK_DELETE_ERROR, response: error });
  });
}
