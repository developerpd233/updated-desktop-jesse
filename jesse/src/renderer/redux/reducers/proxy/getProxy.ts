import { PROXY_LIST_LOADING, PROXY_LIST_SUCCESS, PROXY_LIST_ERROR } from '../../../constant/ActionTypes/ProxyType'

const getProxyReducer = (state: object = {}, action: any) => {
  switch (action.type) {
    case PROXY_LIST_LOADING: {
      let obj: any = {
        loading: true
      };
      return obj;
    }
    case PROXY_LIST_SUCCESS: {
      let obj: any = {
        loading: false,
        data: action.response.data,
      };
      return obj;
    }
    case PROXY_LIST_ERROR: {
      let obj: any = {
        loading: false,
        status: action.response,
      };
      return obj;
    }
    default:
      return state;
  }
}

export default getProxyReducer
