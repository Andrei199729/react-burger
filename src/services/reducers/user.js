import {
  POST_LOGIN_SUCCESS,
  POST_LOGIN_REQUEST,
  POST_LOGIN_FAILED,
  POST_REGISTER_SUCCESS,
  POST_REGISTER_REQUEST,
  POST_REGISTER_FAILED,
  GET_ABOUT_USER_REQUEST,
  GET_ABOUT_USER_FAILED,
  PATCH_ABOUT_USER_SUCCESS,
  PATCH_ABOUT_USER_REQUEST,
  PATCH_ABOUT_USER_FAILED,
  POST_LOGOUT_SUCCESS,
  POST_LOGOUT_REQUEST,
  POST_LOGOUT_FAILED,
  RESET_PASSWORD_SUCCESS,
  SET_USER_DATA,
  SET_AUTH_LOGGED_IN,
} from "../actions/user";

const initialState = {
  userData: null,
  accessToken: undefined,
  isAuthloggedIn: false,
  success: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_LOGGED_IN:
      return {
        ...state,
        isAuthloggedIn: action.payload,
      };
    case POST_LOGIN_REQUEST:
      return {
        ...state,
      };
    case POST_LOGIN_SUCCESS:
      return {
        ...state,
        userData: action.payload,
        accessToken: action.accessToken,
        isAuthloggedIn: true,
      };
    case POST_LOGIN_FAILED:
      return {
        ...state,
      };

    case POST_REGISTER_REQUEST:
      return {
        ...state,
      };
    case POST_REGISTER_SUCCESS:
      return {
        ...state,
        userData: action.payload,
      };
    case POST_REGISTER_FAILED:
      return {
        ...state,
      };

    case GET_ABOUT_USER_REQUEST:
      return {
        ...state,
      };
    case SET_USER_DATA:
      return {
        ...state,
        userData: action.payload,
        accessToken: action.accessToken,
      };
    case GET_ABOUT_USER_FAILED:
      return {
        ...state,
      };

    case PATCH_ABOUT_USER_REQUEST:
      return {
        ...state,
      };
    case PATCH_ABOUT_USER_SUCCESS:
      return {
        ...state,
        user: action.updateUser,
      };
    case PATCH_ABOUT_USER_FAILED:
      return {
        ...state,
      };

    case POST_LOGOUT_REQUEST:
      return {
        ...state,
      };
    case POST_LOGOUT_SUCCESS:
      return {
        ...state,
        accessToken: undefined,
        userData: null,
      };
    case POST_LOGOUT_FAILED:
      return {
        ...state,
      };

    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        success: action.success,
      };

    default:
      return state;
  }
};
