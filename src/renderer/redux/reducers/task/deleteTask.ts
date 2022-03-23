import { TASK_DELETE_REQUEST, TASK_DELETE_SUCCESS, TASK_DELETE_ERROR } from '../../../constant/ActionTypes/TaskType'

const deleteTaskReducer = (state: object = {}, action: any) => {
    switch (action.type) {
        case TASK_DELETE_REQUEST: {
            let obj: any = {
                loading: true
            };
            return obj;
        }
        case TASK_DELETE_SUCCESS: {
            let obj: any = {
                loading: false,
                data: action.response.data,
            };
            return obj;
        }
        case TASK_DELETE_ERROR: {
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

export default deleteTaskReducer
