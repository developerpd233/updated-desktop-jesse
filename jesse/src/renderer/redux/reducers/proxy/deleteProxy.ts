import { PROXY_DELETE_REQUEST, PROXY_DELETE_SUCCESS, PROXY_DELETE_ERROR } from '../../../constant/ActionTypes/ProxyType'

const deleteProxyReducer = (state: object = {}, action: any) => {
  switch (action.type) {
    case PROXY_DELETE_REQUEST: {
      let obj: any = {
        loading: true
      };
      return obj;
    }
    case PROXY_DELETE_SUCCESS: {
      let obj: any = {
        loading: false,
        data: action.response.data,
      };
      return obj;
    }
    case PROXY_DELETE_ERROR: {
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

export default deleteProxyReducer
