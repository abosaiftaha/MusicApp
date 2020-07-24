import {ActionTypes, LOGIN, LOGOUT} from './types';

export const loginUser = (user: object): ActionTypes => ({
  type: LOGIN,
  payload: user,
});

export const logoutUser = (): ActionTypes => ({
  type: LOGOUT,
});
