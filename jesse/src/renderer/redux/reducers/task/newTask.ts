import { TASK_CREATE_REQUEST, TASK_CREATE_SUCCESS, TASK_CREATE_ERROR } from '../../../constant/ActionTypes/TaskType'

const addNewTask = (state: object = {}, action: any) => {
    switch (action.type) {
        case TASK_CREATE_REQUEST: {
            let obj:any = {
                loading: true
            };
            return obj;
        }
        case TASK_CREATE_SUCCESS: {
            let obj:any = {
                loading: false,
                data: action.response.data,
            };
            return obj;
        }
        case TASK_CREATE_ERROR: {
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

export default addNewTask
