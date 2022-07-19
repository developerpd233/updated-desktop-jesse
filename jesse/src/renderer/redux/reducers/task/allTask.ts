import { TASK_LIST_LOADING, TASK_LIST_SUCCESS, TASK_LIST_ERROR } from '../../../constant/ActionTypes/TaskType'

const allTaskReducer = (state: object = {}, action: any) => {
    switch (action.type) {
        case TASK_LIST_LOADING: {
            let obj: any = {
                loading: true
            };
            return obj;
        }
        case TASK_LIST_SUCCESS: {
            // console.log(action.response.data, 'action.response.data');

            let obj: any = {
                loading: false,
                data: action.response.data,
            };
            return obj;
        }
        case TASK_LIST_ERROR: {
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

export default allTaskReducer
