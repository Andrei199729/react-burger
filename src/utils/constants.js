import { getCookie } from "./cookie";

export const BASE_URL = "https://norma.nomoreparties.space/api";

export const WS_BASE_URL = "wss://norma.nomoreparties.space/orders";
export const WS_BASE_URL_ALL = "wss://norma.nomoreparties.space/orders/all";

export const MAIN_PATH = "/";
export const INGREDIENTS_ID_PATH = "/ingredients/:id";
export const INGREDIENTS_PATH = "/ingredients";
export const LOGIN_PATH = "/login";
export const REGISTER_PATH = "/register";
export const ORDER_FEED_PATH = "/feed";
export const ORDER_FEED_ID_PATH = "/feed/:id";
export const PASSWORD_RECOVERY_PATH = "/forgot-password";
export const PASSWORD_RESET_PATH = "/reset-password";
export const PROFILE_PATH = "/profile";
export const PROFILE_ORDERS_PATH = "/profile/orders";
export const ORDERS_PATH = "orders";
export const PROFILE_ORDERS_ID_PATH = "/profile/orders/:number";
export const ERROR_PATH = "*";

export const INGREDIENTS_API_PATH = "ingredients";
export const FORGOT_PASS_API_PATH = "password-reset";
export const RESET_PASS_API_PATH = "password-reset/reset";

export const REGISTER_USER_PATH = "auth/register";
export const LOGIN_USER_PATH = "auth/login";
export const USER_PATH = "auth/user";
export const TOKEN_PATH = "auth/token";
export const LOGOUT_PATH = "auth/logout";

export const accessToken = getCookie("accessToken");
