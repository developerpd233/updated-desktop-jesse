import { PROFILE_UPDATE_REQUEST, PROFILE_UPDATE_SUCCESS, PROFILE_UPDATE_ERROR } from '../../../constant/ActionTypes/ProfileType'

const updateProfileReducer = (state: object = {}, action: any) => {
  switch (action.type) {
    case PROFILE_UPDATE_REQUEST: {
      let obj: any = {
        loading: true
      };
      return obj;
    }
    case PROFILE_UPDATE_SUCCESS: {
      let obj: any = {
        loading: false,
        data: action.response.data,
      };
      return obj;
    }
    case PROFILE_UPDATE_ERROR: {
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

export default updateProfileReducer
