import { SETTING_LIST_LOADING, SETTING_LIST_SUCCESS, SETTING_LIST_ERROR } from '../../../constant/ActionTypes/SettingType'

const getProfileSettingReducer = (state: object = {}, action: any) => {
  switch (action.type) {
    case SETTING_LIST_LOADING: {
      let obj: any = {
        loading: true
      };
      return obj;
    }
    case SETTING_LIST_SUCCESS: {
      let obj: any = {
        loading: false,
        data: action.response.data,
      };
      return obj;
    }
    case SETTING_LIST_ERROR: {
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

export default getProfileSettingReducer
