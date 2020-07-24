export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export interface ConfigsReducer {
  loggedIn: boolean;
}

interface LoginAction {
  type: typeof LOGIN;
  payload: object;
}

interface LogoutAction {
  type: typeof LOGOUT;
}

export type ActionTypes = LoginAction | LogoutAction;
