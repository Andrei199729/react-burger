import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
  WS_CONNECTION_START,
} from "../actions-types/wsActionTypes";
import { TPopupOrderDetails } from "../types/data";

export interface IWebSocket {
  wsInit: any;
  onOpen: any;
  onClose: any;
  onError: any;
  onMessage: any;
  wsSend: any;
}

export interface IWsMessage {
  orders: Array<TPopupOrderDetails>;
  success: boolean;
  total: number;
  totalToday: number;
}

export interface IWsConnectionStartAction {
  readonly type: typeof WS_CONNECTION_START;
  readonly payload: Event | string;
}

export interface IWsConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
  readonly error: boolean;
  readonly errorMessage: null | string;
}

export interface IWsConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly payload: null | string;
}

export interface IWsConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

export interface IWsConnectionMessageAction {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: IWsMessage;
}

export interface IWsSendMessageAction {
  readonly type: typeof WS_SEND_MESSAGE;
}

export type TWsConnectionAction =
  | IWsConnectionSuccessAction
  | IWsConnectionErrorAction
  | IWsConnectionClosedAction
  | IWsConnectionMessageAction
  | IWsSendMessageAction
  | IWsConnectionStartAction;

export const wsConnectionStartAction = (
  url: Event | string
): IWsConnectionStartAction => {
  return {
    type: WS_CONNECTION_START,
    payload: url,
  };
};

export const wsConnectionSuccess = (
  error: boolean,
  errorMessage: null | string
): IWsConnectionSuccessAction => {
  return {
    type: WS_CONNECTION_SUCCESS,
    error,
    errorMessage,
  };
};

export const wsConnectionError = (
  error: string | null
): IWsConnectionErrorAction => {
  return {
    type: WS_CONNECTION_ERROR,
    payload: error,
  };
};

export const wsConnectionClosed = (): IWsConnectionClosedAction => {
  return {
    type: WS_CONNECTION_CLOSED,
  };
};

export const wsGetMessage = (
  message: IWsMessage
): IWsConnectionMessageAction => {
  return {
    type: WS_GET_MESSAGE,
    payload: message,
  };
};
