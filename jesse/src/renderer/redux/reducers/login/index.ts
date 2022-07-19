import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR } from '../../../constant/ActionTypes/LoginType'

const loginReducer = (state: object = {}, action: any) => {
    switch (action.type) {
        case LOGIN_REQUEST: {
            let obj: any = {
                loading: true
            };
            return obj;
        }
        case LOGIN_SUCCESS: {
            let obj: any = {
                loading: false,
                data: action.response.data,
            };
            return obj;
        }
        case LOGIN_ERROR: {
            let obj : any= {
                loading: false,
                status: action.response,
            };
            return obj;
        }
        default:
            return state;
    }
}

export default loginReducer
