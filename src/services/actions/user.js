import {
  getAboutUser,
  postRefreshToken,
  postRegister,
  updateAboutUser,
  postLogout,
} from "../../utils/auth";
import { postLogin } from "../../utils/auth";
import api from "../../utils/api";
import { deleteCookie, getCookie, setCookie } from "../../utils/cookie";

export const GET_ABOUT_USER_SUCCESS = "GET_ABOUT_USER_SUCCESS";
export const GET_ABOUT_USER_REQUEST = "GET_ABOUT_USER_REQUEST";
export const GET_ABOUT_USER_FAILED = "GET_ABOUT_USER_FAILED";

export const POST_REGISTER_SUCCESS = "POST_REGISTER_SUCCESS";
export const POST_REGISTER_REQUEST = "POST_REGISTER_REQUEST";
export const POST_REGISTER_FAILED = "POST_REGISTER_FAILED";

export const POST_LOGIN_SUCCESS = "POST_LOGIN_SUCCESS";
export const POST_LOGIN_REQUEST = "POST_LOGIN_REQUEST";
export const POST_LOGIN_FAILED = "POST_LOGIN_FAILED";

export const PATCH_ABOUT_USER_SUCCESS = "PATCH_ABOUT_USER_SUCCESS";
export const PATCH_ABOUT_USER_REQUEST = "PATCH_ABOUT_USER_REQUEST";
export const PATCH_ABOUT_USER_FAILED = "PATCH_ABOUT_USER_FAILED";

export const POST_REFRESH_TOKEN_SUCCESS = "POST_REFRESH_TOKEN_SUCCESS";
export const POST_REFRESH_TOKEN_REQUEST = "POST_REFRESH_TOKEN_REQUEST";
export const POST_REFRESH_TOKEN_FAILED = "POST_REFRESH_TOKEN_FAILED";

export const POST_LOGOUT_SUCCESS = "POST_LOGOUT_SUCCESS";
export const POST_LOGOUT_REQUEST = "POST_LOGOUT_REQUEST";
export const POST_LOGOUT_FAILED = "POST_LOGOUT_FAILED";

export const POST_FORGOT_PASSWORD_SUCCESS = "POST_FORGOT_PASSWORD_SUCCESS";
export const POST_FORGOT_PASSWORD_REQUEST = "POST_FORGOT_PASSWORD_REQUEST";
export const POST_FORGOT_PASSWORD_FAILED = "POST_FORGOT_PASSWORD_FAILED";

export const POST_RESET_PASSWORD_SUCCESS = "POST_RESET_PASSWORD_SUCCESS";
export const POST_RESET_PASSWORD_REQUEST = "POST_RESET_PASSWORD_REQUEST";
export const POST_RESET_PASSWORD_FAILED = "POST_RESET_PASSWORD_FAILED";

export const RESET_PASSWORD_SUCCESS = "RESET_PASSWORD_SUCCESS";

export function postRegisterAuth(
  nameRegister,
  emailRegister,
  passwordRegister
) {
  return function (dispatch) {
    dispatch({
      type: POST_REGISTER_REQUEST,
    });
    postRegister(nameRegister, emailRegister, passwordRegister)
      .then((res) => {
        dispatch({
          type: POST_REGISTER_SUCCESS,
          user: res,
        });
        setCookie("accessToken", res.accessToken);
        setCookie("refreshToken", res.refreshToken);
      })
      .catch((err) =>
        dispatch({
          type: POST_REGISTER_FAILED,
        })
      );
  };
}

export function postLoginAuth(emailRegister, passwordRegister) {
  return function (dispatch) {
    dispatch({
      type: POST_LOGIN_REQUEST,
    });
    postLogin(emailRegister, passwordRegister)
      .then((res) => {
        dispatch({
          type: POST_LOGIN_SUCCESS,
          user: res,
        });
        setCookie("accessToken", res.accessToken);
        setCookie("refreshToken", res.refreshToken);
      })
      .catch((err) =>
        dispatch({
          type: POST_LOGIN_FAILED,
        })
      );
  };
}

export function getUserData() {
  return function (dispatch) {
    dispatch({
      type: GET_ABOUT_USER_REQUEST,
    });
    getAboutUser(getCookie("accessToken"))
      .then((res) => {
        dispatch({
          type: GET_ABOUT_USER_SUCCESS,
          user: res,
        });
      })
      .catch((err) =>
        dispatch({
          type: GET_ABOUT_USER_FAILED,
        })
      );
  };
}

export function patchUserData(name, email, password, token) {
  return function (dispatch) {
    dispatch({
      type: PATCH_ABOUT_USER_REQUEST,
    });
    updateAboutUser(name, email, password, token)
      .then((res) => {
        dispatch({
          type: PATCH_ABOUT_USER_SUCCESS,
          updateUser: res,
        });
      })
      .catch((err) =>
        dispatch({
          type: PATCH_ABOUT_USER_FAILED,
        })
      );
  };
}

export function postTokenRefresh(refreshToken) {
  return function (dispatch) {
    dispatch({
      type: POST_REFRESH_TOKEN_REQUEST,
    });
    postRefreshToken(refreshToken)
      .then((res) => {
        setCookie("accessToken", res.accessToken);
        setCookie("refreshToken", res.refreshToken);
        dispatch({
          type: POST_REFRESH_TOKEN_SUCCESS,
          user: getAboutUser(),
        });
      })
      .catch((err) =>
        dispatch({
          type: POST_REFRESH_TOKEN_FAILED,
        })
      );
  };
}

export function postLogoutAuth(token) {
  return function (dispatch) {
    dispatch({
      type: POST_LOGOUT_REQUEST,
    });
    postLogout(token)
      .then((res) => {
        deleteCookie("accessToken", res.accessToken);
        deleteCookie("refreshToken", res.refreshToken);
        dispatch({
          type: POST_LOGOUT_SUCCESS,
          tokenLogout: res,
        });
      })
      .catch((err) =>
        dispatch({
          type: POST_LOGOUT_FAILED,
        })
      );
  };
}

export function postForgotPasswordAuth(email) {
  return function (dispatch) {
    dispatch({
      type: POST_FORGOT_PASSWORD_REQUEST,
    });
    api
      .postForgotPassword(email)
      .then((res) => {
        dispatch({
          type: POST_FORGOT_PASSWORD_SUCCESS,
          email: email,
        });
      })
      .catch((err) =>
        dispatch({
          type: POST_FORGOT_PASSWORD_FAILED,
        })
      );
  };
}

export function postResetPasswordAuth(email, token) {
  return function (dispatch) {
    dispatch({
      type: POST_RESET_PASSWORD_REQUEST,
    });
    api
      .postResetPassword(email, token)
      .then((res) => {
        dispatch({
          type: POST_RESET_PASSWORD_SUCCESS,
          email: email,
          token: token,
          success: res.success,
        });
      })
      .catch((err) =>
        dispatch({
          type: POST_RESET_PASSWORD_FAILED,
        })
      );
  };
}
