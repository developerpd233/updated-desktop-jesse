import { SETTING_UPDATE_REQUEST, SETTING_UPDATE_SUCCESS, SETTING_UPDATE_ERROR } from '../../../constant/ActionTypes/SettingType'

const updateProfileReducer = (state: object = {}, action: any) => {
  switch (action.type) {
    case SETTING_UPDATE_REQUEST: {
      let obj: any = {
        loading: true
      };
      return obj;
    }
    case SETTING_UPDATE_SUCCESS: {
      let obj: any = {
        loading: false,
        data: action.response.data,
      };
      return obj;
    }
    case SETTING_UPDATE_ERROR: {
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
