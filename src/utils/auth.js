import { setCookie } from "./cookie";
import {
  BASE_URL,
  REGISTER_USER_PATH,
  LOGIN_USER_PATH,
  USER_PATH,
  TOKEN_PATH,
  LOGOUT_PATH,
} from "../utils/constants";

const HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const getJson = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await getJson(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await this.postRefreshToken();
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

export const postRefreshToken = (refreshToken) => {
  return fetch(`${BASE_URL}/${TOKEN_PATH}`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({
      token: refreshToken,
    }),
  }).then(getJson);
};

export const postRegister = (nameRegister, emailRegister, passwordRegister) => {
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

export const postLogin = (emailRegister, passwordRegister) => {
  return fetch(`${BASE_URL}/${LOGIN_USER_PATH}`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({
      email: emailRegister,
      password: passwordRegister,
    }),
  }).then(getJson);
};

export const postLogout = (token) => {
  return fetch(`${BASE_URL}/${LOGOUT_PATH}`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({ token: token }),
  }).then(getJson);
};

export const getAboutUser = (token) => {
  return fetchWithRefresh(`${BASE_URL}/${USER_PATH}`, {
    method: "GET",
    headers: {
      ...HEADERS,
      Authorization: token,
    },
  });
};

export const updateAboutUser = (
  updateName,
  updateEmail,
  updatePassword,
  token
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
