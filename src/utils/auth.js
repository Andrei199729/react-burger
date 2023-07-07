import { getCookie } from "./cookie";

export const BASE_URL = "https://norma.nomoreparties.space/api";

const HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const getJson = (response) => {
  if (response.ok) {
    return response.json();
  }
  throw new Error({ status: response.status });
};

export const postRegister = (nameRegister, emailRegister, passwordRegister) => {
  return fetch(`${BASE_URL}/auth/register`, {
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
  return fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({
      email: emailRegister,
      password: passwordRegister,
    }),
  }).then(getJson);
};

export const postLogout = (token) => {
  return fetch(`${BASE_URL}/auth/logout`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({ token: token }),
  }).then(getJson);
};

export const getAboutUser = (token) => {
  return fetch(`${BASE_URL}/auth/user`, {
    method: "GET",
    headers: {
      ...HEADERS,
      Authorization: token,
    },
  }).then(getJson);
};

export const updateAboutUser = (
  updateName,
  updateEmail,
  updatePassword,
  token
) => {
  return fetch(`${BASE_URL}/auth/user`, {
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

export const postRefreshToken = (refreshToken) => {
  console.log(refreshToken);
  return fetch(`${BASE_URL}/auth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: refreshToken,
    }),
  }).then(this._getResponseData);
};