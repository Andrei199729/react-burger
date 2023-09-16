import { setCookie } from "./cookie";
import {
  BASE_URL,
  REGISTER_USER_PATH,
  LOGIN_USER_PATH,
  USER_PATH,
  TOKEN_PATH,
  LOGOUT_PATH,
} from "./constants";

const HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const getJson = (res: Response) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};
export const postRefreshToken = (refreshToken: string) => {
  return fetch(`${BASE_URL}/${TOKEN_PATH}`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({
      token: refreshToken,
    }),
  }).then(getJson);
};

export const fetchWithRefresh = async (url: string, options: any) => {
  try {
    const res = await fetch(url, options);
    return await getJson(res);
  } catch (err: any) {
    if (err.message === "jwt expired") {
      const newLocal: any = this;
      const refreshData = await newLocal.postRefreshToken();

      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      setCookie("accessToken", refreshData.accessToken);
      options.headers.Authorization = refreshData.accessToken;
      const res = await fetch(url, options);
      return await getJson(res);
    } else {
      return Promise.reject(err);
    }
  }
};

export const postRegister = (
  nameRegister: string,
  emailRegister: string,
  passwordRegister: string
) => {
  return fetch(`${BASE_URL}/${REGISTER_USER_PATH}`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({
      name: nameRegister,
      email: emailRegister,
      password: passwordRegister,
    }),
  }).then(getJson);
};

export const postLogin = (emailRegister: string, passwordRegister: string) => {
  return fetch(`${BASE_URL}/${LOGIN_USER_PATH}`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({
      email: emailRegister,
      password: passwordRegister,
    }),
  }).then(getJson);
};

export const postLogout = (token: string | undefined) => {
  return fetch(`${BASE_URL}/${LOGOUT_PATH}`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({ token: token }),
  }).then(getJson);
};

export const getAboutUser = (token: string) => {
  return fetchWithRefresh(`${BASE_URL}/${USER_PATH}`, {
    method: "GET",
    headers: {
      ...HEADERS,
      Authorization: token,
    },
  });
};

export const updateAboutUser = (
  updateName: string,
  updateEmail: string,
  updatePassword: string,
  token: string
) => {
  return fetchWithRefresh(`${BASE_URL}/${USER_PATH}`, {
    method: "PATCH",
    headers: {
      ...HEADERS,
      Authorization: token,
    },
    body: JSON.stringify({
      name: updateName,
      email: updateEmail,
      password: updatePassword,
    }),
  }).then(getJson);
};
