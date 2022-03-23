import {ORDER_LIST_LOADING,ORDER_LIST_SUCCESS, ORDER_LIST_ERROR} from '../../constant/ActionTypes/OrderType'
import { Dispatch } from 'redux'
import { baseURL } from '../../constant/url'
import axios from 'axios'
// const axios = require("axios")

export const orderList = () => (dispatch: Dispatch): any => {
  dispatch({ type: ORDER_LIST_LOADING });
  return axios({
    method: "GET",
    url: `${baseURL}orders`,
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
    return dispatch({ type: ORDER_LIST_SUCCESS, response: response });
  }).catch((error: any) => {
    if (error.message === "Network Error") {
      return dispatch({ type: ORDER_LIST_ERROR, response: error.message });
    }
    if (error.response.status === 401) {
      // logout(error.response.data.mesg)
    }
    return dispatch({ type: ORDER_LIST_ERROR, response: error.response });
  });
}
