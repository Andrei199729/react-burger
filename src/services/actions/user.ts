import {
  getAboutUser,
  postRefreshToken,
  postRegister,
  updateAboutUser,
  postLogout,
} from "../../utils/auth";
import { postLogin } from "../../utils/auth";
import api from "../../utils/api";
import { deleteCookie, setCookie } from "../../utils/cookie";
import { accessToken } from "../../utils/constants";
import { AppDispatch, AppThunk } from "../types";
import { TLogout, TUserData, TUserUpdate } from "../types/data";

export const GET_ABOUT_USER_SUCCESS: "GET_ABOUT_USER_SUCCESS" =
  "GET_ABOUT_USER_SUCCESS";
export const GET_ABOUT_USER_REQUEST: "GET_ABOUT_USER_REQUEST" =
  "GET_ABOUT_USER_REQUEST";
export const GET_ABOUT_USER_FAILED: "GET_ABOUT_USER_FAILED" =
  "GET_ABOUT_USER_FAILED";

export const POST_REGISTER_SUCCESS: "POST_REGISTER_SUCCESS" =
  "POST_REGISTER_SUCCESS";
export const POST_REGISTER_REQUEST: "POST_REGISTER_REQUEST" =
  "POST_REGISTER_REQUEST";
export const POST_REGISTER_FAILED: "POST_REGISTER_FAILED" =
  "POST_REGISTER_FAILED";

export const POST_LOGIN_REQUEST: "POST_LOGIN_REQUEST" = "POST_LOGIN_REQUEST";
export const POST_LOGIN_FAILED: "POST_LOGIN_FAILED" = "POST_LOGIN_FAILED";

export const PATCH_ABOUT_USER_SUCCESS: "PATCH_ABOUT_USER_SUCCESS" =
  "PATCH_ABOUT_USER_SUCCESS";
export const PATCH_ABOUT_USER_REQUEST: "PATCH_ABOUT_USER_REQUEST" =
  "PATCH_ABOUT_USER_REQUEST";
export const PATCH_ABOUT_USER_FAILED: "PATCH_ABOUT_USER_FAILED" =
  "PATCH_ABOUT_USER_FAILED";

export const POST_REFRESH_TOKEN_SUCCESS: "POST_REFRESH_TOKEN_SUCCESS" =
  "POST_REFRESH_TOKEN_SUCCESS";
export const POST_REFRESH_TOKEN_REQUEST: "POST_REFRESH_TOKEN_REQUEST" =
  "POST_REFRESH_TOKEN_REQUEST";
export const POST_REFRESH_TOKEN_FAILED: "POST_REFRESH_TOKEN_FAILED" =
  "POST_REFRESH_TOKEN_FAILED";

export const POST_LOGOUT_SUCCESS: "POST_LOGOUT_SUCCESS" = "POST_LOGOUT_SUCCESS";
export const POST_LOGOUT_REQUEST: "POST_LOGOUT_REQUEST" = "POST_LOGOUT_REQUEST";
export const POST_LOGOUT_FAILED: "POST_LOGOUT_FAILED" = "POST_LOGOUT_FAILED";

export const POST_FORGOT_PASSWORD_SUCCESS: "POST_FORGOT_PASSWORD_SUCCESS" =
  "POST_FORGOT_PASSWORD_SUCCESS";
export const POST_FORGOT_PASSWORD_REQUEST: "POST_FORGOT_PASSWORD_REQUEST" =
  "POST_FORGOT_PASSWORD_REQUEST";
export const POST_FORGOT_PASSWORD_FAILED: "POST_FORGOT_PASSWORD_FAILED" =
  "POST_FORGOT_PASSWORD_FAILED";

export const POST_RESET_PASSWORD_SUCCESS: "POST_RESET_PASSWORD_SUCCESS" =
  "POST_RESET_PASSWORD_SUCCESS";
export const POST_RESET_PASSWORD_REQUEST: "POST_RESET_PASSWORD_REQUEST" =
  "POST_RESET_PASSWORD_REQUEST";
export const POST_RESET_PASSWORD_FAILED: "POST_RESET_PASSWORD_FAILED" =
  "POST_RESET_PASSWORD_FAILED";

export const RESET_PASSWORD_SUCCESS: "RESET_PASSWORD_SUCCESS" =
  "RESET_PASSWORD_SUCCESS";

export const SET_AUTH_LOGGED_IN: "SET_AUTH_LOGGED_IN" = "SET_AUTH_LOGGED_IN";
export const SET_USER_DATA: "SET_USER_DATA" = "SET_USER_DATA";
export const SET_USER_DATA_REGISTER: "SET_USER_DATA_REGISTER" =
  "SET_USER_DATA_REGISTER";

export interface IGetAboutUserSuccessAction {
  readonly type: typeof GET_ABOUT_USER_SUCCESS;
}

export interface IGetAboutUserRequestAction {
  readonly type: typeof GET_ABOUT_USER_REQUEST;
}

export interface IGetAboutUserFailedAction {
  readonly type: typeof GET_ABOUT_USER_FAILED;
}

export interface IPostRegisterSuccessAction {
  readonly type: typeof POST_REGISTER_SUCCESS;
  readonly user: TUserData;
  readonly password: string;
}

export interface IPostRegisterRequestAction {
  readonly type: typeof POST_REGISTER_REQUEST;
}

export interface IPostRegisterFailedAction {
  readonly type: typeof POST_REGISTER_FAILED;
}

export interface IPostLoginRequestAction {
  readonly type: typeof POST_LOGIN_REQUEST;
}

export interface IPostLoginFailedAction {
  readonly type: typeof POST_LOGIN_FAILED;
}

export interface IPatchAboutUserSuccessAction {
  readonly type: typeof PATCH_ABOUT_USER_SUCCESS;
  readonly updateUser: TUserUpdate;
}

export interface IPatchAboutUserRequestAction {
  readonly type: typeof PATCH_ABOUT_USER_REQUEST;
}

export interface IPatchAboutUserFailedAction {
  readonly type: typeof PATCH_ABOUT_USER_FAILED;
}

export interface IPostRefreshTokenRequestAction {
  readonly type: typeof POST_REFRESH_TOKEN_REQUEST;
}

export interface IPostRefreshTokenFailedAction {
  readonly type: typeof POST_REFRESH_TOKEN_FAILED;
}

export interface IPostLogoutSuccessAction {
  readonly type: typeof POST_LOGOUT_SUCCESS;
  readonly tokenLogout: TLogout[];
}

export interface IPostLogoutRequestAction {
  readonly type: typeof POST_LOGOUT_REQUEST;
}

export interface IPostLogoutFailedAction {
  readonly type: typeof POST_LOGOUT_FAILED;
}

export interface IPostForgotPasswordSuccessAction {
  readonly type: typeof POST_FORGOT_PASSWORD_SUCCESS;
  readonly email: string;
}

export interface IPostForgotPasswordRequestAction {
  readonly type: typeof POST_FORGOT_PASSWORD_REQUEST;
}

export interface IPostForgotPasswordFailedAction {
  readonly type: typeof POST_FORGOT_PASSWORD_FAILED;
}

export interface IPostResetPasswordSuccessAction {
  readonly type: typeof POST_RESET_PASSWORD_SUCCESS;
  readonly email: string;
  readonly token: string;
  readonly success: boolean;
}

export interface IPostResetPasswordRequestAction {
  readonly type: typeof POST_RESET_PASSWORD_REQUEST;
}

export interface IPostResetPasswordFailedAction {
  readonly type: typeof POST_RESET_PASSWORD_FAILED;
}

export interface IResetPasswordSuccessAction {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
  readonly success: boolean;
}

export interface ISetAuthLoggedInAction {
  readonly type: typeof SET_AUTH_LOGGED_IN;
  readonly authloggedIn: boolean;
}

export interface ISetUserDataAction {
  readonly type: typeof SET_USER_DATA;
  readonly userData: TUserData | null;
  readonly accessToken: string;
}

export interface ISetUserDataRegisterAction {
  readonly type: typeof SET_USER_DATA_REGISTER;
}

export type TUserAction =
  | IGetAboutUserSuccessAction
  | IGetAboutUserRequestAction
  | IGetAboutUserFailedAction
  | IPostRegisterSuccessAction
  | IPostRegisterRequestAction
  | IPostRegisterFailedAction
  | IPostLoginRequestAction
  | IPostLoginFailedAction
  | IPatchAboutUserSuccessAction
  | IPatchAboutUserRequestAction
  | IPatchAboutUserFailedAction
  | IPostRefreshTokenRequestAction
  | IPostRefreshTokenFailedAction
  | IPostLogoutSuccessAction
  | IPostLogoutRequestAction
  | IPostLogoutFailedAction
  | IPostForgotPasswordSuccessAction
  | IPostForgotPasswordRequestAction
  | IPostForgotPasswordFailedAction
  | IPostResetPasswordSuccessAction
  | IPostResetPasswordRequestAction
  | IPostResetPasswordFailedAction
  | IResetPasswordSuccessAction
  | ISetAuthLoggedInAction
  | ISetUserDataAction
  | ISetUserDataRegisterAction;

export const getAboutUserSuccessAction = (): IGetAboutUserSuccessAction => ({
  type: GET_ABOUT_USER_SUCCESS,
});

export const getAboutUserRequestAction = (): IGetAboutUserRequestAction => ({
  type: GET_ABOUT_USER_REQUEST,
});

export const getAboutUserFailedAction = (): IGetAboutUserFailedAction => ({
  type: GET_ABOUT_USER_FAILED,
});

export const postRegisterSuccessAction = (
  user: TUserData,
  password: string
): IPostRegisterSuccessAction => ({
  type: POST_REGISTER_SUCCESS,
  user,
  password,
});

export const postRegisterRequestAction = (): IPostRegisterRequestAction => ({
  type: POST_REGISTER_REQUEST,
});

export const postRegisterFailedAction = (): IPostRegisterFailedAction => ({
  type: POST_REGISTER_FAILED,
});

export const setUserData = (
  userData: null | TUserData,
  accessToken: any
): ISetUserDataAction => ({
  type: SET_USER_DATA,
  userData,
  accessToken,
});

export const setAuthloggedIn = (
  authloggedIn: boolean
): ISetAuthLoggedInAction => ({
  type: SET_AUTH_LOGGED_IN,
  authloggedIn,
});

export const postLoginRequestAction = (): IPostLoginRequestAction => ({
  type: POST_LOGIN_REQUEST,
});

export const postLoginFailedAction = (): IPostLoginFailedAction => ({
  type: POST_LOGIN_FAILED,
});

export const patchAboutUserSuccessAction = (
  updateUser: TUserUpdate
): IPatchAboutUserSuccessAction => ({
  type: PATCH_ABOUT_USER_SUCCESS,
  updateUser,
});

export const patchAboutUserRequestAction =
  (): IPatchAboutUserRequestAction => ({
    type: PATCH_ABOUT_USER_REQUEST,
  });

export const patchAboutUserFailedAction = (): IPatchAboutUserFailedAction => ({
  type: PATCH_ABOUT_USER_FAILED,
});

export const postRefreshTokenRequestAction =
  (): IPostRefreshTokenRequestAction => ({
    type: POST_REFRESH_TOKEN_REQUEST,
  });

export const postRefreshTokenFailedAction =
  (): IPostRefreshTokenFailedAction => ({
    type: POST_REFRESH_TOKEN_FAILED,
  });

export const postLogoutSuccessAction = (
  tokenLogout: TLogout[]
): IPostLogoutSuccessAction => ({
  type: POST_LOGOUT_SUCCESS,
  tokenLogout,
});

export const postLogoutRequestAction = (): IPostLogoutRequestAction => ({
  type: POST_LOGOUT_REQUEST,
});

export const postLogoutFailedAction = (): IPostLogoutFailedAction => ({
  type: POST_LOGOUT_FAILED,
});

export const postForgotPasswordSuccessAction = (
  email: string
): IPostForgotPasswordSuccessAction => ({
  type: POST_FORGOT_PASSWORD_SUCCESS,
  email,
});

export const postForgotPasswordRequestAction =
  (): IPostForgotPasswordRequestAction => ({
    type: POST_FORGOT_PASSWORD_REQUEST,
  });

export const postForgotPasswordFailedAction =
  (): IPostForgotPasswordFailedAction => ({
    type: POST_FORGOT_PASSWORD_FAILED,
  });

export const postResetPasswordSuccessAction = (
  email: string,
  token: string,
  success: boolean
): IPostResetPasswordSuccessAction => ({
  type: POST_RESET_PASSWORD_SUCCESS,
  email,
  token,
  success,
});

export const postResetPasswordRequestAction =
  (): IPostResetPasswordRequestAction => ({
    type: POST_RESET_PASSWORD_REQUEST,
  });

export const postResetPasswordFailedAction =
  (): IPostResetPasswordFailedAction => ({
    type: POST_RESET_PASSWORD_FAILED,
  });

export const resetPasswordSuccessAction = (
  success: boolean
): IResetPasswordSuccessAction => ({
  type: RESET_PASSWORD_SUCCESS,
  success,
});

export function postRegisterAuth(
  nameRegister: string,
  emailRegister: string,
  passwordRegister: string
) {
  return function (dispatch: AppDispatch) {
    dispatch(postRegisterRequestAction());
    postRegister(nameRegister, emailRegister, passwordRegister)
      .then((res) => {
        dispatch(postRegisterSuccessAction(res, passwordRegister));
        setCookie("accessToken", res.accessToken);
        setCookie("refreshToken", res.refreshToken);
        dispatch(setAuthloggedIn(true));
      })
      .catch((err) => dispatch(postRegisterFailedAction()));
  };
}

export function postLoginAuth(emailRegister: string, passwordRegister: string) {
  return function (dispatch: AppDispatch) {
    dispatch(postLoginRequestAction());
    postLogin(emailRegister, passwordRegister)
      .then((res) => {
        dispatch(setUserData(res, res.accessToken));

        dispatch(setAuthloggedIn(true));
        setCookie("accessToken", res.accessToken);
        setCookie("refreshToken", res.refreshToken);
      })
      .catch((err) => dispatch(postLoginFailedAction()));
  };
}

export function getUserData(): AppThunk<Promise<unknown>> {
  return function (dispatch) {
    dispatch(getAboutUserRequestAction());

    return getAboutUser(accessToken)
      .then((res) => {
        dispatch(setUserData(res, res.accessToken));
        dispatch(setAuthloggedIn(true));
      })
      .catch((err) => dispatch(getAboutUserFailedAction()));
  };
}

export function patchUserData(
  name: string,
  email: string,
  password: string,
  token: string
) {
  return function (dispatch: AppDispatch) {
    dispatch(patchAboutUserRequestAction());
    updateAboutUser(name, email, password, token)
      .then((res) => {
        dispatch(patchAboutUserSuccessAction(res));

        dispatch(setAuthloggedIn(true));
      })
      .catch(() => dispatch(patchAboutUserFailedAction()));
  };
}

export function postTokenRefresh(refreshToken: string) {
  return function (dispatch: AppDispatch) {
    dispatch(postRefreshTokenRequestAction());
    postRefreshToken(refreshToken)
      .then((res) => {
        dispatch(getUserData());
        setCookie("accessToken", res.accessToken);
        setCookie("refreshToken", res.refreshToken);
      })
      .catch((err) => dispatch(postRefreshTokenFailedAction()));
  };
}

export function postLogoutAuth(token: string | undefined) {
  return function (dispatch: AppDispatch) {
    dispatch(postLogoutRequestAction());

    postLogout(token)
      .then((res) => {
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
        dispatch(postLogoutSuccessAction(res));

        dispatch(setUserData(null, null));
      })
      .catch(() => dispatch(postLogoutFailedAction()));
  };
}

export function postForgotPasswordAuth(email: string) {
  return function (dispatch: AppDispatch) {
    dispatch(postForgotPasswordRequestAction());
    api
      .postForgotPassword(email)
      .then(() => {
        dispatch(postForgotPasswordSuccessAction(email));
      })
      .catch(() => dispatch(postForgotPasswordFailedAction()));
  };
}

export function postResetPasswordAuth(email: string, token: string) {
  return function (dispatch: AppDispatch) {
    dispatch(postResetPasswordRequestAction());
    api
      .postResetPassword(email, token)
      .then((res) => {
        dispatch(postResetPasswordSuccessAction(email, token, res.success));
      })
      .catch((err) => dispatch(postResetPasswordFailedAction()));
  };
}

export const checkUserAuth = (): AppThunk<unknown> => {
  return (dispatch) => {
    if (accessToken) {
      dispatch(getUserData())
        .catch(() => {
          deleteCookie("accessToken");
          deleteCookie("refreshToken");
          dispatch(setUserData(null, null));
        })
        .finally(() => dispatch(setAuthloggedIn(true)));
    } else {
      dispatch(setAuthloggedIn(true));
    }
  };
};
