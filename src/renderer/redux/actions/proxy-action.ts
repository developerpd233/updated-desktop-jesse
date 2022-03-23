import { PROXY_LIST_LOADING,PROXY_LIST_SUCCESS, PROXY_LIST_ERROR, PROXY_CREATE_REQUEST, PROXY_CREATE_SUCCESS, PROXY_CREATE_ERROR,
PROXY_DELETE_REQUEST, PROXY_DELETE_SUCCESS, PROXY_DELETE_ERROR, PROXY_UPDATE_REQUEST, PROXY_UPDATE_SUCCESS, PROXY_UPDATE_ERROR } from '../../constant/ActionTypes/ProxyType'
import { Dispatch } from 'redux'
import { baseURL } from '../../constant/url'
import { ProxyData } from '../../constant/Interface'
import axios from "axios"

export const proxyList = () => (dispatch: Dispatch): any => {
  dispatch({ type: PROXY_LIST_LOADING });
  return axios({
      method: "GET",
      url: `${baseURL}proxies`,
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
  })
      .then((response: any) => {
          // setCookie(response)
          return dispatch({ type: PROXY_LIST_SUCCESS, response: response });
      })
      .catch((error: any) => {
          if (error.message === "Network Error") {
              return dispatch({ type: PROXY_LIST_ERROR, response: error.message });
          }
          if (error.response.status === 401) {
              // logout(error.response.data.mesg)
          }
          return dispatch({ type: PROXY_LIST_ERROR, response: error.response });
      });
}

export const createNewProxy = (obj: ProxyData) => (dispatch: Dispatch): any => {
  dispatch({ type: PROXY_CREATE_REQUEST });
  let url = `${baseURL}proxies`;
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
      return dispatch({ type: PROXY_CREATE_SUCCESS, response: response });
  }).catch((error: any) => {
    if (error.message === "Network Error") {
        return dispatch({
            type: PROXY_CREATE_ERROR,
            response: error.message,
        });
    }
    if (error.response.status === 401) {
        // logout(error.response.data.mesg)
    }
    return dispatch({ type: PROXY_CREATE_ERROR, response: error });
  });
}

export const getProxyRecord = (id: any)  => (dispatch: Dispatch): any => {
  dispatch({ type: PROXY_LIST_LOADING });
  var url = `${baseURL}proxies/${id}`
  return axios({
      method: "get",
      url: url,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem('token')}`
      },
  }).then((response: any) => {
      return dispatch({ type: PROXY_LIST_SUCCESS, response: response });
  }).catch((error: any) => {
    if (error.message === "Network Error") {
        return dispatch({
          type: PROXY_LIST_ERROR,
          response: error.message,
        });
    }
    if (error.message === "Network Error") {
    }
    else if (error.response.status === 401) {
        // dispatch(tokenAuthFailedAction());
    }
    return dispatch({ type: PROXY_LIST_ERROR, response: error });
  });
}

export const deleteProxy = (id: any) => (dispatch: Dispatch): any => {
  dispatch({ type: PROXY_DELETE_REQUEST })
  let url = `${baseURL}proxies/${id}`;
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
    return dispatch({ type: PROXY_DELETE_SUCCESS, response: response });
  }).catch((error: any) => {
      if (error.message === "Network Error") {
        return dispatch({
          type: PROXY_DELETE_ERROR,
          response: error.message,
        });
      }

      if (error.response.status === 401) {
        // logout(error.response.data.mesg)
      }
      return dispatch({ type: PROXY_DELETE_ERROR, response: error });
  });
}

export const updateProxy = (obj: ProxyData, id: any) => (dispatch: Dispatch): any => {
  dispatch({ type: PROXY_UPDATE_REQUEST })
  let url = `${baseURL}proxies/${id}`;
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
    return dispatch({ type: PROXY_UPDATE_SUCCESS, response: response });
  }).catch((error: any) => {
    if (error.message === "Network Error") {
      return dispatch({
        type: PROXY_UPDATE_ERROR,
        response: error.message,
      });
    }
    if (error.response.status === 401) {
        // logout(error.response.data.mesg)
    }
    return dispatch({ type: PROXY_UPDATE_ERROR, response: error });
  });
}
