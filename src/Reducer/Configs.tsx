import {ActionTypes, ConfigsReducer, LOGIN, LOGOUT} from '../Action/types';

const initialState: ConfigsReducer = {
  loggedIn: false,
};

export default (state = initialState, action: ActionTypes): ConfigsReducer => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loggedIn: true,
      };
    case LOGOUT:
      return {
        ...state,
        loggedIn: false,
      };
    default:
      return state;
  }
};
