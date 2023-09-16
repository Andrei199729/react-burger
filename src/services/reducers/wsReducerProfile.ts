import {
  WS_CONNECTION_SUCCESS_PROFILE,
  WS_CONNECTION_ERROR_PROFILE,
  WS_CONNECTION_CLOSED_PROFILE,
  WS_GET_MESSAGE_PROFILE,
  WS_CONNECTION_START_PROFILE,
} from "../actions-types/wsActionTypes";

import { WS_BASE_URL } from "../../utils/constants";
import { TPopupOrderDetails } from "../types/data";
import { TWsConnectionProfileAction } from "../actions/wsActionProfile";

type TWsConnectedProfileState = {
  wsConnected: boolean;
  orders: ReadonlyArray<TPopupOrderDetails>;
  total: number;
  totalToday: number;
  error: boolean;
  errorMessage: null | string;
};

const initialState: TWsConnectedProfileState = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0,
  error: false,
  errorMessage: null,
};

export const initFeedProfileOrders = (accessToken: string) => ({
  type: WS_CONNECTION_START_PROFILE,
  payload: `${WS_BASE_URL}?token=${accessToken}`,
});

export const wsReducerProfile = (
  state = initialState,
  action: TWsConnectionProfileAction
): TWsConnectedProfileState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS_PROFILE:
      return {
        ...state,
        error: false,
        errorMessage: null,
        wsConnected: true,
      };
    case WS_CONNECTION_ERROR_PROFILE:
      return {
        ...state,
        errorMessage: action.payload,
        error: true,
        wsConnected: false,
      };
    case WS_CONNECTION_CLOSED_PROFILE:
      return {
        ...state,
        error: false,
        wsConnected: false,
      };
    case WS_GET_MESSAGE_PROFILE:
      return {
        ...state,
        error: false,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      };
    default:
      return state;
  }
};
