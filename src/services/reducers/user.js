import {
  POST_LOGIN_SUCCESS,
  POST_LOGIN_REQUEST,
  POST_LOGIN_FAILED,
  POST_REGISTER_SUCCESS,
  POST_REGISTER_REQUEST,
  POST_REGISTER_FAILED,
  GET_ABOUT_USER_SUCCESS,
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
} from "../actions/user";

const initialState = {
  login: {
    email: "",
    password: "",
  },
  register: {
    name: "",
    email: "",
    password: "",
  },
  userData: null,
  accessToken: undefined,
  isAuthloggedIn: false,
  success: false,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_LOGIN_REQUEST:
      return {
        ...state,
      };
    case POST_LOGIN_SUCCESS:
      return {
        ...state,
        login: {
          email: action.user.email,
          password: action.user.password,
        },
        accessToken: action.accessToken,
        isAuthloggedIn: action.payload,
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
        register: {
          name: action.user.name,
          email: action.user.email,
          password: action.user.password,
        },
        isAuthloggedIn: action.payload,
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
        userData: action.user,
        isAuthloggedIn: action.payload,
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
        isAuthloggedIn: action.payload,
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
        isAuthloggedIn: action.payload,
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
