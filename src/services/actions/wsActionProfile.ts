import {
  WS_CONNECTION_SUCCESS_PROFILE,
  WS_CONNECTION_ERROR_PROFILE,
  WS_CONNECTION_CLOSED_PROFILE,
  WS_GET_MESSAGE_PROFILE,
  WS_SEND_MESSAGE_PROFILE,
  WS_CONNECTION_START_PROFILE,
} from "../actions-types/wsActionTypes";
import { TPopupOrderDetails } from "../types/data";

export interface IWebSocketProfile {
  wsInit: any;
  onOpen: any;
  onClose: any;
  onError: any;
  onMessage: any;
  wsSend: any;
}

export interface IWsMessageProfile {
  orders: Array<TPopupOrderDetails>;
  success: boolean;
  total: number;
  totalToday: number;
}

export interface IWsConnectionStartProfileAction {
  readonly type: typeof WS_CONNECTION_START_PROFILE;
  readonly payload: Event | string;
}

export interface IWsConnectionSuccessProfileAction {
  readonly type: typeof WS_CONNECTION_SUCCESS_PROFILE;
}

export interface IWsConnectionErrorProfileAction {
  readonly type: typeof WS_CONNECTION_ERROR_PROFILE;
  readonly payload: null | string;
}

export interface IWsConnectionClosedProfileAction {
  readonly type: typeof WS_CONNECTION_CLOSED_PROFILE;
}

export interface IWsConnectionMessageProfileAction {
  readonly type: typeof WS_GET_MESSAGE_PROFILE;
  readonly payload: IWsMessageProfile;
}

export interface IWsSendMessageProfileAction {
  readonly type: typeof WS_SEND_MESSAGE_PROFILE;
}

export type TWsConnectionProfileAction =
  | IWsConnectionSuccessProfileAction
  | IWsConnectionErrorProfileAction
  | IWsConnectionClosedProfileAction
  | IWsConnectionMessageProfileAction
  | IWsSendMessageProfileAction
  | IWsConnectionStartProfileAction;

export const wsConnectionStartProfileAction = (
  url: Event | string
): IWsConnectionStartProfileAction => {
  return {
    type: WS_CONNECTION_START_PROFILE,
    payload: url,
  };
};

export const wsConnectionSuccessProfile =
  (): IWsConnectionSuccessProfileAction => {
    return {
      type: WS_CONNECTION_SUCCESS_PROFILE,
    };
  };

export const wsConnectionErrorProfile = (
  error: null | string
): IWsConnectionErrorProfileAction => {
  return {
    type: WS_CONNECTION_ERROR_PROFILE,
    payload: error,
  };
};

export const wsConnectionClosedProfile =
  (): IWsConnectionClosedProfileAction => {
    return {
      type: WS_CONNECTION_CLOSED_PROFILE,
    };
  };

export const wsGetMessageProfile = (
  message: IWsMessageProfile
): IWsConnectionMessageProfileAction => {
  return {
    type: WS_GET_MESSAGE_PROFILE,
    payload: message,
  };
};
