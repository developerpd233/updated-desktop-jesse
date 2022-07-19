import { PROFILE_LIST_LOADING, PROFILE_LIST_SUCCESS, PROFILE_LIST_ERROR } from '../../../constant/ActionTypes/ProfileType'

const getProfileReducer = (state: object = {}, action: any) => {
  switch (action.type) {
    case PROFILE_LIST_LOADING: {
      let obj: any = {
        loading: true
      };
      return obj;
    }
    case PROFILE_LIST_SUCCESS: {
      let obj: any = {
        loading: false,
        data: action.response.data,
      };
      return obj;
    }
    case PROFILE_LIST_ERROR: {
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

export default getProfileReducer
