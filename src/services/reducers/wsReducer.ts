import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_CONNECTION_START,
} from "../actions-types/wsActionTypes";

import { WS_BASE_URL_ALL } from "../../utils/constants";
import { TOrderIngredient } from "../types/data";
import { TWsConnectionAction } from "../actions/wsAction";

type TWsConnectedState = {
  wsConnected: boolean;
  orders: TOrderIngredient[];
  total: number;
  totalToday: number;
  error: boolean;
  preloader: boolean;
  errorMessage: null | string;
};

const initialState: TWsConnectedState = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0,
  error: false,
  errorMessage: null,
  preloader: false,
};

export const initFeed = () => ({
  type: WS_CONNECTION_START,
  payload: WS_BASE_URL_ALL,
});

export const wsReducer = (
  state = initialState,
  action: TWsConnectionAction
): TWsConnectedState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: false,
        errorMessage: null,
        wsConnected: true,
        preloader: true,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
        error: true,
        wsConnected: false,
        preloader: false,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: false,
        wsConnected: false,
        preloader: false,
      };

    case WS_GET_MESSAGE:
      return {
        ...state,
        error: false,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
        preloader: false,
      };
    default:
      return state;
  }
};
