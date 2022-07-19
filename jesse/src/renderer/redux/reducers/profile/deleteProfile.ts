import { PROFILE_DELETE_REQUEST, PROFILE_DELETE_SUCCESS, PROFILE_DELETE_ERROR } from '../../../constant/ActionTypes/ProfileType'

const deleteProfileReducer = (state: object = {}, action: any) => {
  switch (action.type) {
    case PROFILE_DELETE_REQUEST: {
      let obj: any = {
        loading: true
      };
      return obj;
    }
    case PROFILE_DELETE_SUCCESS: {
      let obj: any = {
        loading: false,
        data: action.response.data,
      };
      return obj;
    }
    case PROFILE_DELETE_ERROR: {
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

export default deleteProfileReducer
