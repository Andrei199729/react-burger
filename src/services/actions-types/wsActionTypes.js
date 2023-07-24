import { useDispatch, useSelector } from "react-redux";

export const WS_CONNECTION_START = "WS_CONNECTION_START";
export const WS_CONNECTION_SUCCESS = "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR = "WS_CONNECTION_ERROR";
export const WS_CONNECTION_CLOSED = "WS_CONNECTION_CLOSED";
export const WS_GET_MESSAGE = "WS_GET_MESSAGE";
export const WS_FEED_INIT = "WS_FEED_INIT";

export const WS_CONNECTION_START_PROFILE = "WS_CONNECTION_START_PROFILE";
export const WS_CONNECTION_SUCCESS_PROFILE = "WS_CONNECTION_SUCCESS_PROFILE";
export const WS_CONNECTION_ERROR_PROFILE = "WS_CONNECTION_ERROR_PROFILE";
export const WS_CONNECTION_CLOSED_PROFILE = "WS_CONNECTION_CLOSED_PROFILE";
export const WS_GET_MESSAGE_PROFILE = "WS_GET_MESSAGE_PROFILE";

export const WS_FEED_INIT_PROFILE = "WS_FEED_INIT_PROFILE";

export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;
