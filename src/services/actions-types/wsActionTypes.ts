import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../types";
import type {} from "redux-thunk/extend-redux";

export const WS_CONNECTION_START: "WS_CONNECTION_START" = "WS_CONNECTION_START";
export const WS_CONNECTION_SUCCESS: "WS_CONNECTION_SUCCESS" =
  "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR: "WS_CONNECTION_ERROR" = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_CLOSED: "WS_CONNECTION_CLOSED" =
  "WS_CONNECTION_CLOSED";
export const WS_GET_MESSAGE: "WS_GET_MESSAGE" = "WS_GET_MESSAGE";
export const WS_FEED_INIT: "WS_FEED_INIT" = "WS_FEED_INIT";
export const WS_SEND_MESSAGE: "WS_SEND_MESSAGE" = "WS_SEND_MESSAGE";
export const WS_DISCONNECT: "WS_DISCONNECT" = "WS_DISCONNECT";

export const WS_CONNECTION_START_PROFILE: "WS_CONNECTION_START_PROFILE" =
  "WS_CONNECTION_START_PROFILE";
export const WS_CONNECTION_SUCCESS_PROFILE: "WS_CONNECTION_SUCCESS_PROFILE" =
  "WS_CONNECTION_SUCCESS_PROFILE";
export const WS_CONNECTION_ERROR_PROFILE: "WS_CONNECTION_ERROR_PROFILE" =
  "WS_CONNECTION_ERROR_PROFILE";
export const WS_CONNECTION_CLOSED_PROFILE: "WS_CONNECTION_CLOSED_PROFILE" =
  "WS_CONNECTION_CLOSED_PROFILE";
export const WS_GET_MESSAGE_PROFILE: "WS_GET_MESSAGE_PROFILE" =
  "WS_GET_MESSAGE_PROFILE";
export const WS_FEED_INIT_PROFILE: "WS_FEED_INIT_PROFILE" =
  "WS_FEED_INIT_PROFILE";
export const WS_SEND_MESSAGE_PROFILE: "WS_SEND_MESSAGE_PROFILE" =
  "WS_SEND_MESSAGE_PROFILE";
export const WS_DISCONNECT_PROFILE: "WS_DISCONNECT_PROFILE" =
  "WS_DISCONNECT_PROFILE";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
