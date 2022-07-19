import { PROFILE_CREATE_REQUEST, PROFILE_CREATE_SUCCESS, PROFILE_CREATE_ERROR } from '../../../constant/ActionTypes/ProfileType'

const addNewProfile = (state: object = {}, action: any) => {
    switch (action.type) {
        case PROFILE_CREATE_REQUEST: {
            let obj:any = {
                loading: true
            };
            return obj;
        }
        case PROFILE_CREATE_SUCCESS: {
            let obj:any = {
                loading: false,
                data: action.response.data,
            };
            return obj;
        }
        case PROFILE_CREATE_ERROR: {
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

export default addNewProfile
