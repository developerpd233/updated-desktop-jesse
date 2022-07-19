import { STORE_LIST_LOADING, STORE_LIST_SUCCESS, STORE_LIST_ERROR } from '../../../constant/ActionTypes/StoreType'

const allStoreReducer = (state: object = {}, action: any) => {
    switch (action.type) {
        case STORE_LIST_LOADING: {
            let obj: any = {
                loading: true
            };
            return obj;
        }
        case STORE_LIST_SUCCESS: {
            let obj: any = {
                loading: false,
                data: action.response.data,
            };
            return obj;
        }
        case STORE_LIST_ERROR: {
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

export default allStoreReducer
