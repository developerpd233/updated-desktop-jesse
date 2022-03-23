import { STORE_LIST_LOADING,STORE_LIST_SUCCESS, STORE_LIST_ERROR} from '../../constant/ActionTypes/StoreType'
import { Dispatch } from 'redux'
import { baseURL } from '../../constant/url'

const axios = require("axios")

export const storeList = () => (dispatch: Dispatch): any => {
  dispatch({ type: STORE_LIST_LOADING });
  return axios({
      method: "GET",
      url: `${baseURL}profiles`,
      // headers: {
      //     Accept: "application/json",
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${ReadCookie("token")}`
      // },
      // params: {
      //     ...(skip || skip === 0 ? { skip: skip } : {}),
      //     ...(page ? { page: page } : {}),
      //     ...(search ? { search: search } : {})
      // }
  })
      .then((response: any) => {
          // setCookie(response)
          return dispatch({ type: STORE_LIST_SUCCESS, response: response });
      })
      .catch((error: any) => {
          if (error.message === "Network Error") {
              return dispatch({ type: STORE_LIST_ERROR, response: error.message });
          }
          if (error.response.status === 401) {
              // logout(error.response.data.mesg)
          }
          return dispatch({ type: STORE_LIST_ERROR, response: error.response });
      });
}
