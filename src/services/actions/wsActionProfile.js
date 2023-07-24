import {
  WS_CONNECTION_SUCCESS_PROFILE,
  WS_CONNECTION_ERROR_PROFILE,
  WS_CONNECTION_CLOSED_PROFILE,
  WS_GET_MESSAGE_PROFILE,
} from "../actions-types/wsActionTypes";

export const wsConnectionSuccessProfile = () => {
  return {
    type: WS_CONNECTION_SUCCESS_PROFILE,
  };
};

export const wsConnectionErrorProfile = () => {
  return {
    type: WS_CONNECTION_ERROR_PROFILE,
  };
};

export const wsConnectionClosedProfile = () => {
  return {
    type: WS_CONNECTION_CLOSED_PROFILE,
  };
};

export const wsGetMessageProfile = (message) => {
  return {
    type: WS_GET_MESSAGE_PROFILE,
    payload: message,
  };
};
