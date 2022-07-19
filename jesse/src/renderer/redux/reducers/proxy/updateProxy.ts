import { PROXY_UPDATE_REQUEST, PROXY_UPDATE_SUCCESS, PROXY_UPDATE_ERROR } from '../../../constant/ActionTypes/ProxyType'

const updateProxyReducer = (state: object = {}, action: any) => {
  switch (action.type) {
    case PROXY_UPDATE_REQUEST: {
      let obj: any = {
        loading: true
      };
      return obj;
    }
    case PROXY_UPDATE_SUCCESS: {
      let obj: any = {
        loading: false,
        data: action.response.data,
      };
      return obj;
    }
    case PROXY_UPDATE_ERROR: {
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

export default updateProxyReducer
