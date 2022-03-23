import { PROXY_CREATE_REQUEST, PROXY_CREATE_SUCCESS, PROXY_CREATE_ERROR } from '../../../constant/ActionTypes/ProxyType'

const addNewProxt = (state: object = {}, action: any) => {
    switch (action.type) {
        case PROXY_CREATE_REQUEST: {
            let obj:any = {
                loading: true
            };
            return obj;
        }
        case PROXY_CREATE_SUCCESS: {
            let obj:any = {
                loading: false,
                data: action.response.data,
            };
            return obj;
        }
        case PROXY_CREATE_ERROR: {
            let obj:any = {
                loading: false,
                status: action.response,
            };
            return obj;
        }
        default:
            return state;
    }
}

export default addNewProxt
