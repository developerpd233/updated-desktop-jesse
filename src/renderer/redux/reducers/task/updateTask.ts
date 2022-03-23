import { TASK_UPDATE_REQUEST, TASK_UPDATE_SUCCESS, TASK_UPDATE_ERROR } from '../../../constant/ActionTypes/TaskType'

const updateTaskReducer = (state: object = {}, action: any) => {
    switch (action.type) {
        case TASK_UPDATE_REQUEST: {
            let obj: any = {
                loading: true
            };
            return obj;
        }
        case TASK_UPDATE_SUCCESS: {
            let obj: any = {
                loading: false,
                data: action.response.data,
            };
            return obj;
        }
        case TASK_UPDATE_ERROR: {
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

export default updateTaskReducer
