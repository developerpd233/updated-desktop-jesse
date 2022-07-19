import { ORDER_LIST_LOADING, ORDER_LIST_SUCCESS, ORDER_LIST_ERROR } from '../../../constant/ActionTypes/OrderType'

const allOrderReducer = (state: object = {}, action: any) => {
    switch (action.type) {
        case ORDER_LIST_LOADING: {
            let obj: any = {
                loading: true
            };
            return obj;
        }
        case ORDER_LIST_SUCCESS: {
            let obj: any = {
                loading: false,
                data: action.response.data,
            };
            return obj;
        }
        case ORDER_LIST_ERROR: {
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

export default allOrderReducer
